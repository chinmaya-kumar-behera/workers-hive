const express = require("express");
const { getCategories, getCategory, getsubcategories, getSubcategoryDetail } = require("../controllers/categoriesController");
const { getSliderImage } = require("../controllers/sliderController");
const { signUp, signIn } = require("../controllers/authenticationController");
const { createServiceWorker, getWorkers } = require("../controllers/serviceWorkerController");
const multer = require("multer");

const router = express.Router();
const path = require("path");
const { getSearchResult } = require("../controllers/saerchController");
const { getUser, updateUser } = require("../controllers/userController");

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
router.get("/subcategorydetail/:id", getSubcategoryDetail);

// Authentication controllers
router.post("/signup",signUp)
router.post("/signIn", signIn);

// serviceWorker

const multerMiddleware = upload.fields([
  { name: "profilePic", maxCount: 2 },
  { name: "workingPhotos", maxCount: 10 },
]);

router.post(
  "/serviceWorker/create",
  upload.fields([
    { name: "profilePic", maxCount: 2 },
    { name: "workingPhotos", maxCount: 10 },
  ]),
  createServiceWorker
);

router.get("/workers/:id", getWorkers);

// search api
router.get("/search/:query", getSearchResult);

//user routes
router.get("/user/:id", getUser);
router.post( "/user/:id/update",
  upload.fields([
    { name: "profilePic", maxCount: 2 },
    { name: "workingPhotos", maxCount: 10 },
  ]),
  updateUser
);





module.exports = router;
