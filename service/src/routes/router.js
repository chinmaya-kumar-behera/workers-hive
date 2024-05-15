const express = require("express");
const { getCategories, getCategory, getsubcategories, getSubcategoryDetail } = require("../controllers/categoriesController");
const { getSliderImage } = require("../controllers/sliderController");
const { signUp, signIn, verifyOTP, resendOTP } = require("../controllers/authenticationController");
const { createServiceWorker, getWorkers } = require("../controllers/serviceWorkerController");
const multer = require("multer");

const router = express.Router();
const path = require("path");
const { getSearchResult } = require("../controllers/saerchController");
const { getUser, updateUser } = require("../controllers/userController");
const { bookAppointment, getWorkerAppointment, getUserAppointment } = require("../controllers/appointmentController");
const { initiateTransaction, createRazorpayOrder, captureRazorpayPayment, confirmTransactionAPI } = require("../controllers/transactionController");

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
router.post("/verifyotp", verifyOTP);
router.post("/resendotp", resendOTP);

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
  upload.fields([{ name: "profilePic", maxCount: 2 },{ name: "workingPhotos", maxCount: 10 },]),updateUser);

// apppointment routes
router.post("/bookappointment",upload.fields([{ name: "appointmentImages", maxCount: 10 },]),bookAppointment);
router.get("/getworkerappointments/:id", getWorkerAppointment);
router.get("/getuserappointments/:id", getUserAppointment);

// transaction routes

router.post("/initiateTransaction", initiateTransaction)
router.post("/razorpay/order", createRazorpayOrder);
router.post("/razorpay/capturepayment", captureRazorpayPayment);
router.post("/confirmTransaction", confirmTransactionAPI);

module.exports = router;
