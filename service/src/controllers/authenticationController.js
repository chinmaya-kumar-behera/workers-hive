const User = require("../models/userModel");

const signUp = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please fill all the fields!" });
    }
    
    const isUserExist = await User.findOne({ email: email });

    if (isUserExist) {
     return res.status(200).json({
        message:
          "This email has already registered. Please provide a different one.",
      });
    }

  try {
    const userData = new User({
      name,
      email,
      password,
    });

    await userData.save();

    return res.status(200).json({ message: "Sign Up was successful"});
  } catch (error) {
    if (error.code === 11000 && error.keyPattern && error.keyPattern.name) {
      return res.status(400).json({ message: "Name must be unique." });
    }
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

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
  } catch (error) {
    console.error("Sign In failed:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


module.exports = { signUp, signIn };
