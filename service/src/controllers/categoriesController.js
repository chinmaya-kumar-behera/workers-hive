const Category = require("../models/categoryModel");
const SubCategory = require('../models/subCategoryModel');

// ------------ ADMIN CONTROLLERS -------------- //

const createCategory = async (req, res) => {
  console.log("create category called");
  try {
    const { heading, description } = req.body;
    const { file } = req;

    if (!heading || !description || !file) {
      return res.status(400).json({ error: "Invalid input data" });
    }

    const imageUrl = `${process.env.BASE_URL}/images/${file.filename}`;

    const result = await Category.create({
      heading,
      description,
      image: imageUrl,
    });

    res.status(201).json({ message: "Category created successfully", result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createSubCategory = async (req, res) => {
  try {
    const { heading, description, categoryId } = req.body;
    const { file } = req;

    if (!heading || !description || !file) {
      return res.status(400).json({ error: "Invalid input data" });
    }

    const imageUrl = `${process.env.BASE_URL}/images/${file.filename}`;

    const subcategory = await SubCategory.create({
      categoryId,
      heading,
      description,
      image: imageUrl,
    });

    res.status(201).json({ message: "SubCategory created successfully", subcategory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { heading, description } = req.body;
    const { file } = req;

    if (!categoryId || !heading || !description) {
      return res.status(400).json({ error: "Invalid input data" });
    }

    const existingCategory = await Category.findById(categoryId);

    if (!existingCategory) {
      return res.status(404).json({ error: "Category not found" });
    }

    existingCategory.heading = heading;
    existingCategory.description = description;

    if (file) {
      existingCategory.image = `${process.env.BASE_URL}/images/${file.filename}`;
    }

    const updatedCategory = await existingCategory.save();

    res
      .status(200)
      .json({ message: "Category updated successfully", updatedCategory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// -------------------  Controllers ------------------ //

const getCategories = async (req, res) => { 
  const categories = await Category.find(); 
  res.status(200).json({ message: "Successfully fetched", data: categories });
}

const getCategory = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(404).json({ message: "Id not found" });
  }
  const category = await Category.findById(id);
  res.status(200).json({ message: "Successfully fetched", data: category });
};

const getsubcategories = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(404).json({ message: "Id not found" });
  }
  const category = await SubCategory.find({ categoryId: id });
  res.status(200).json({ message: "Successfully fetched", data: category });
};

const getSubcategoryDetail = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(404).json({ message: "Id not found" });
  }
  const category = await SubCategory.findById(id);
  res.status(200).json({ message: "Successfully fetched", data: category });
};

module.exports = {
  createCategory,
  updateCategory,
  getCategories,
  getCategory,
  createSubCategory,
  getsubcategories,
  getSubcategoryDetail,
};
