const Appointment = require("../models/appointmentModel");
const User = require("../models/userModel");
// const User = require("../models/userModel");


const bookAppointment = async (req, res) => {
    try {
        const { appointmentImages } = req.files;
        const { workerId, userId, description } = req.body;

        let appointmentImageUrls;

        if (appointmentImages?.length > 0) {
            appointmentImageUrls = appointmentImages.map(
                (file) => `${process.env.BASE_URL}/images/appointment/${file.filename}`
            );
        }

        const result = await new Appointment({
            workerId,
            userId,
            description,
            appointmentPhotos: appointmentImageUrls,
        });

        await result.save();
        return res.json({ message: "Appointment created successfully!", data: result });
    } catch (err) {
        res.status(400).json({
          message: "Some Error occured!",
        });
    }
};

const getAppointment = async (req, res) => {
    try {
        const { id } = req.params;

        const isExist = await User.findById(id);

        if (!isExist) {
            return res.status(404).json({ message: "User Not Found" });
        }

        const result = await Appointment.find({ userId: id });

        return res
          .status(200)
          .json({ message: "Appointment get successfully", data: result });
    } catch (err) {
        res.status(400).json({
          message: "Some Error occured!",
        });
    }
  console.log(req.params);
  
  return res.json({ message: "get received" });
};

module.exports = { bookAppointment, getAppointment };
