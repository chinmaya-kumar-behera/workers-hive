const User = require("../models/userModel");
const nodemailer = require('nodemailer');



const emailTemplate = (otp, name) => {
  
  return `<section class="max-w-2xl px-6 py-8 mx-auto bg-white dark:bg-gray-900">
    <header>
        <a href="#">
            <img class="w-auto h-7 sm:h-8" src="https://merakiui.com/images/full-logo.svg" alt=""/>
        </a>
    </header>

    <main class="mt-8">
        <h2 class="text-gray-700 dark:text-gray-200">Hi ${name},</h2>

        <p class="mt-2 leading-loose text-gray-600 dark:text-gray-300">
            This is your verification code:
        </p>

       <h1>${otp}</h1>

        <p class="mt-4 leading-loose text-gray-600 dark:text-gray-300">
            This code will only be valid for the next 5 minutes. If the code does not work, you can use this login verification link:
        </p>
        
        <button class="px-6 py-2 mt-6 text-sm font-medium tracking-wider text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
            Verify email
        </button>
        
        <p class="mt-8 text-gray-600 dark:text-gray-300">
            Thanks, <br/>
            Meraki UI team
        </p>
    </main>
    

    <footer class="mt-8">
        <p class="text-gray-500 dark:text-gray-400">
            This email was sent to <a href="#" class="text-blue-600 hover:underline dark:text-blue-400" target="_blank">contact@merakiui.com</a>. 
            If you'd rather not receive this kind of email, you can <a href="#" class="text-blue-600 hover:underline dark:text-blue-400">unsubscribe</a> or <a href="#" class="text-blue-600 hover:underline dark:text-blue-400">manage your email preferences</a>.
        </p>

        <p class="mt-3 text-gray-500 dark:text-gray-400">© { new Date().getFullYear() } Meraki UI. All Rights Reserved.</p>
    </footer>
</section>`;
}


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

const signIn = async (req, res) => {
  try {
    const { email, password, accessToken } = req.body;

    if (accessToken) {
      let { email, name } = parseJwt(accessToken);

      const user = await User.findOne({ email });

      if (!user) {
        const userData = new User({
          name,
          email,
        });

        return res.status(200).json({
          message: "Sign In was successful (access token)",
          data: userData,
        });
      }

      return res.status(200).json({
        message: "Sign In was successful (access token)",
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
      subject: "Verification Code for Sign-Up",
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
