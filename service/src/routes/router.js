const express = require("express");
const { getCategories, getCategory, getsubcategories } = require("../controllers/categoriesController");
const { getSliderImage } = require("../controllers/sliderController");
const { signUp, signIn } = require("../controllers/authenticationController");
const { createServiceWorker, getWorkers } = require("../controllers/serviceWorkerController");
const multer = require("multer");

const router = express.Router();
const path = require("path");
const { getSearchResult } = require("../controllers/saerchController");

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

router.get("/categories", getCategories);
router.get("/category/:id", getCategory);
router.get("/subcategories/:id", getsubcategories);
router.get("/getsliderimage", getSliderImage);

// Authentication controllers
router.post("/signup",signUp)
router.post("/signIn", signIn);

// serviceWorker
router.post("/serviceWorker/create", upload.single("file"), createServiceWorker);
router.get("/workers/:id", getWorkers);

// search api
router.get("/search/:query", getSearchResult);


module.exports = router;
