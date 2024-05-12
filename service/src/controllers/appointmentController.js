const Appointment = require("../models/appointmentModel");
const User = require("../models/userModel");

const getLatestAppointmentId = async () => {
  try {
    const latestAppointment = await Appointment.findOne(
      {},
      { appointmentId: 1 }
    )
      .sort({ appointmentId: -1 })
      .limit(1)
      .lean();

    if (latestAppointment) {
      return latestAppointment.appointmentId;
    } else {
      return "APP00000001";
    }
  } catch (error) {
    console.error("Error retrieving latest appointment ID:", error);
    throw error;
  }
};

const generateAppointmentId = async () => {
  let latestAppointmentId = await getLatestAppointmentId();
  let latestIdNumber = parseInt(latestAppointmentId.substring(3)); 
  latestIdNumber++; 
  const newAppointmentId = `APP${latestIdNumber.toString().padStart(8, "0")}`;
  return newAppointmentId;
};

const bookAppointment = async (req, res) => {
  try {
    const { appointmentImages } = req.files;
    const { workerId, userId, description } = req.body;

    let appointmentImageUrls;
    if (appointmentImages?.length > 0) {
      appointmentImageUrls = appointmentImages.map(
        (file) => `${process.env.BASE_URL}/images/${file.filename}`
      );
    }

    const appointmentId = await generateAppointmentId();
    const result = new Appointment({
      appointmentId,
      workerId,
      userId,
      description,
      appointmentPhotos: appointmentImageUrls,
    });

    await result.save();
    return res.json({
      message: "Appointment created successfully!",
      data: result,
    });
  } catch (err) {
    console.error("Error creating appointment:", err);
    res.status(400).json({
      message: "Some Error occurred!",
    });
  }
};

const getWorkerAppointment = async (req, res) => {
    try {
        const { id } = req.params;

        const isExist = await User.findById(id);

        if (!isExist) {
            return res.status(404).json({ message: "User Not Found" });
        }

        const result = await Appointment.find({ workerId: id })
          .populate({ path: "userId", select: "_id name email photo" })
          .populate({ path: "workerId", select: "_id name email photo" });
    
        return res
          .status(200)
          .json({ message: "Worker Appointment get successfully", data: result });
    } catch (err) {
        res.status(400).json({
          message: "Some Error occured!",
        });
    }
  console.log(req.params);
  
  return res.json({ message: "get received" });
};

const getUserAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const isExist = await User.findById(id);

    if (!isExist) {
      return res.status(404).json({ message: "User Not Found" });
    }

   const result = await Appointment.find({ userId: id })
     .populate({ path: "userId", select: "_id name email photo" })
     .populate({
       path: "workerId",
       select: "_id name email photo category subcategory",
       populate: {
         path: "category subCategory",
         select:" _id heading"
       },
     });
    
    return res
      .status(200)
      .json({ message: "User Appointment get successfully", data: result });
  } catch (err) {
    res.status(400).json({
      message: "Some Error occured!",
    });
  }
  console.log(req.params);

  return res.json({ message: "get received" });
};

module.exports = { bookAppointment, getWorkerAppointment, getUserAppointment };
