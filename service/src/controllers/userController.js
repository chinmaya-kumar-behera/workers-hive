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

module.exports = { getUser };
