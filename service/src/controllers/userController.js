const User = require("../models/userModel");

const getUser = async (req, res) => {
  console.log("get user ccalled");

  const { id } = req.params;
  console.log(id);

  if (!id) {
    res.status(404).json({ message: "user id not found" });
  }

  const userDetails = await User.findById(id).select("-password");  

  res
    .status(200)
    .json({ message: "Data fetched successfully", data: userDetails });
};

module.exports = { getUser };
