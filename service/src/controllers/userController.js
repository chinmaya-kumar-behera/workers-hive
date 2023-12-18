const User = require("../models/userModel");

const getUser = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(404).json({ message: "user id not found" });
    return; 
  }

  try {
    const userDetails = await User.findById(id)
      .populate("category", ["_id", "heading", "image"])
      .populate("subCategory", ["_id", "heading", "image"])
      .select("-password");

    res
      .status(200)
      .json({ message: "Data fetched successfully", data: userDetails });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateUser = async (req, res) => {
  console.log("update user called")
  try {
    const { id } = req.params;

    const { 
      firstName,
      lastName = "",
      email,
      mobileNumber,
      category,
      subCategory,
      professionDescription,
      price,
      city,
      country,
      gender,
    } = req.body;

    const profilePic = req?.files?.profilePic;
    const workingPhotos = req?.files?.workingPhotos;

    console.log(req.files, req.body);

    if (!id) {
      res.status(404).json({ message: "user id not found" });
      return;
    }

    const userExist = await User.findById(id);

    if (firstName) userExist.name = firstName.trim() + " " + lastName.trim();;
    if (mobileNumber) userExist.phone = mobileNumber;
    if (professionDescription) userExist.description = professionDescription;
    if (category) userExist.category = category;
    if (subCategory) userExist.subCategory = subCategory;
    if (price) userExist.price = price;
    if (gender) userExist.gender = gender;
    if (city && country) userExist.address = { city, country };

    let profileUrl;
    let workerPhotosUrl;

    if (profilePic?.length > 0) {
      profileUrl = `${process.env.BASE_URL}/images/${profilePic[0].filename}`;
    }

    if (workingPhotos?.length > 0) {
      workerPhotosUrl = workingPhotos.map(
        (file) => `${process.env.BASE_URL}/images/${file.filename}`
      );
    }

    if (profileUrl) {
      userExist.photo = profileUrl;
    }

    if (workerPhotosUrl?.length > 0) {
      userExist.workingPhotos = workerPhotosUrl;
    }

    await userExist.save();

    res
      .status(200)
      .json({ message: "UserData Updated successfully", userExist });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


module.exports = { getUser, updateUser };
