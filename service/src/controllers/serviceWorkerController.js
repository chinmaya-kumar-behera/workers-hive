const User = require("../models/userModel");

const createServiceWorker = async (req, res) => {
  try {
    const { userId, firstName, lastName, email, mobileNumber, category, subCategory, professionDescription, price, city, country, gender } = req.body;
    const { profilePic, workingPhotos } = req.files;

    console.log(req.body.userId)

    if (!firstName || !email || !category || !subCategory || !professionDescription || !price || !city || !country || !gender) {
      res.status(500).json({ message: "Fill all the details !" });
      return;
    }

    if (!userId) {
      res.status(404).json({ message: "User Id not Found !" });
    }

    const userExist = await User.findById(userId);

    if (!userExist) {
      res.status(404).json({ message: "User not Found !" });
    }

    let profileUrl;
    let workerPhotosUrl;

    if (profilePic.length > 0) {
      profileUrl = `${process.env.BASE_URL}/images/${profilePic[0].filename}`;
    }

    if (workingPhotos.length > 0) {
      workerPhotosUrl = workingPhotos.map(
        (file) => `${process.env.BASE_URL}/images/${file.filename}`
      );
    }

    userExist.name = firstName.trim() + " " + lastName.trim();
    userExist.phone = mobileNumber;
    userExist.description = professionDescription;
    userExist.category = category;
    userExist.subCategory = subCategory;
    userExist.price = price;
    userExist.gender = gender;
    userExist.address = { city, country };
    userExist.role = 'worker';

    if (profileUrl) {
      userExist.photo = profileUrl;
    }
    if (workerPhotosUrl.length > 0) {
      userExist.workingPhotos = workerPhotosUrl;
    }

    await userExist.save();

    return res
      .status(200)
      .json({ message: "Updated successfully", data: userExist });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }   
}

const getWorkers = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(404).json({ message: "Id not found" });
  }

  const result = await User.find({ subCategory: id });

  return res
    .status(200)
    .json({ message: "fetched successfully", data: result });
};
module.exports = { createServiceWorker, getWorkers };
