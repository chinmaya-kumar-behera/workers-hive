const express = require("express");
const multer = require("multer");
const { createCategory, createSubCategory } = require("../controllers/categoriesController");
const { addSliderImage, deleteSliderImage } = require("../controllers/sliderController");

const adminRouter = express.Router();
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/images");
  },

  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

adminRouter.post("/category/create", upload.single("file"), createCategory);
adminRouter.post("/subcategory/create", upload.single("file"), createSubCategory);
adminRouter.post("/sliderimage", upload.single("file"), addSliderImage);
adminRouter.delete("/deleteSliderImage", deleteSliderImage);

module.exports = adminRouter;
