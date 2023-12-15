const Category = require("../models/categoryModel");
const User = require("../models/userModel");

const getSearchResult = async (req, res) => {
  const { query } = req.params;

  if (!query || typeof query !== "string" || query.trim() === "") {
    return res
      .status(400)
      .json({ message: "Invalid or missing query parameter" });
  }

  try {
    const findCategory = await Category.find({
      heading: { $regex: new RegExp(query, "i") },
    });

    if (findCategory.length === 0) {
      return res.status(404).json({ message: "No matching categories found" });
    }

    const categoryIds = findCategory.map((value) => value._id);

    const workers = await User.find({ category: { $in: categoryIds } }).select(
      "-password -role -createdAt -updatedAt"
    );

    return res.status(200).json({ data: workers });
  } catch (error) {
    console.error("Error searching categories:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { getSearchResult };
