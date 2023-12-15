const User = require("../models/userModel");

const createServiceWorker = async (req, res) => {
  const {
    userId,
   name,
    email,
    mobileNumber,
    category,
    subCategory,
    professionDescription,
    price
  } = req.body;

  const { file } = req;

  if (
   !name ||
    !email ||
    !category ||
    !subCategory ||
    !professionDescription || 
    !price
  ) {
    res.status(500).json({ message: "Fill all the details !" });
    return;
  }

  if (!userId) {
    res.status(404).json({ message: "User Id not Found !" });
  }

  const userExist = await User.findById(userId);
  const imageUrl = `${process.env.BASE_URL}/images/${file.filename}`;

  userExist.name = name;
  userExist.phone = mobileNumber;
  userExist.description = professionDescription;
  userExist.category = category;
  userExist.subCategory = subCategory;
  userExist.photo = imageUrl;
  userExist.price = price;

  await userExist.save();

  return res
    .status(200)
    .json({ message: "Updated successfully", data: userExist });
};

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
