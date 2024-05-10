const User = require("../models/userModel");
const nodemailer = require('nodemailer');
const { emailTemplate } = require("../views/otpVerification");
// const { emailTemplate } = require("../views/otpVerification");


const signUp = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please fill all the fields!" });
    }
    
    const isUserExist = await User.findOne({ email: email });

  if (isUserExist) {
    if (isUserExist.verified == 'false') {
      const OTP = generateOTP();
      sendOTP(email, OTP,isUserExist.name);
      isUserExist.otp = OTP;
      isUserExist.save();
      return res.status(202).json({
        message:
          "This email has already registered. Please go through the verification process.",
        data: isUserExist,
      }); 
    } else {
      return res.status(201).json({
        message:
          "This email has already registered. Please provide a different one.",
        data: isUserExist,
      });
    }
    }
  
  const OTP = generateOTP();
  sendOTP(email, OTP, name);

  try {
    const userData = new User({
      name,
      email,
      password,
      otp: OTP,
    });

    await userData.save();

    return res
      .status(200)
      .json({ message: "Sign Up was successful", data: userData });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern && error.keyPattern.name) {
      return res.status(400).json({ message: "Name must be unique." });
    }
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

function parseJwt(token) {
  return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
}

function generateStrongPassword(length = 12) {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+";
  let password = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }

  return password;
}

const signIn = async (req, res) => {
  try {
    const { email, password, accessToken } = req.body;

    if (accessToken) {
      let { email, name, password } = parseJwt(accessToken);
      const user = await User.findOne({ email });

      if (!user) {
        password = generateStrongPassword();
        console.log(password);
        const userData = new User({
          name,
          email,
          password,
        });

        userData.save();

        return res.status(200).json({
          message: "Sign In was successful (new user access token)",
          data: userData,
        });
      }

      return res.status(200).json({
        message: "Sign In was successful (old user access token)",
        data: user,
      });

    } else {
      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Please provide both email and password." });
      }

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(202).json({ message: "Invalid email or password." });
      }

      const isPasswordMatch = await user.comparePassword(password);

      if (!isPasswordMatch) {
        return res.status(202).json({ message: "Invalid email or password." });
      }

      const userWithoutPassword = {
        _id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      };

      res
        .status(200)
        .json({ message: "Sign In was successful", data: userWithoutPassword });
    }
  } catch (error) {
    console.error("Sign In failed:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000);
}

async function sendOTP(email, otp, name) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NODEMAILER_MAIL,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.NODEMAILER_MAIL,
      to: email,
      subject: "Workers Hive - Verify Your Account",
      html: emailTemplate(otp, name),
    };

    return await transporter.sendMail(mailOptions);
  } catch (err) {
    console.log(err);
  }
}

const verifyOTP = async(req, res) => {
  // console.log(req.body)

  const { id, otp, } = req.body;

  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({
      message:
        "User not found.",
    });
  }

  if (user.otp !== Number(otp)) {
    return res.status(203).json({
      message: "OTP didnot match re check again.",
    });
  }

  user.verified = "true";
  user.save();
  return res.status(200).json({
    message: "Your otp verification was successful.",
  });
}

const resendOTP = async (req, res) => {
  try {
    const { id } = req.body;
    console.log(id)

    const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({
          message: "User not found.",
        });
    }
    
    const OTP = generateOTP();
    result = sendOTP(user.email, OTP,user.name);

    user.otp = OTP;
    user.save();

    return res
      .status(200)
      .json({ message: "Was sent successfully!", data: result });
  } catch (err) {
    console.log(err);
     return res
       .status(400)
       .json({ message: "Error Occured!" });
  }
}


module.exports = { signUp, signIn, verifyOTP, resendOTP };
