const { Admin } = require("../models/auth");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const getUsers = async (req, res) => {
  try {
    const users = await Admin.find();
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get users" });
  }
};

const register = async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Please provide all required fields.' });
    }

    const existingName = await Admin.findOne({ username });
    if (existingName) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    // Check if user already exists
    const existingUser = await Admin.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use.' });
    }

    const user = new Admin({
      username,
      email,
      password: hashedPassword,
    });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error occurred." });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Admin.findOne({ email });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Email or password is incorrect" });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    const { password: userPassword, ...rest } = user._doc;

    res
      .cookie("token", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: "strict",
        secure: false,
      })
      .status(200)
      .json({ rest });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Email or password is incorrect" });
  }
};

const logout = async (req, res) => {
  res.clearCookie("token").json({ message: "Logged out successfully" });
};

module.exports = {
  register,
  login,
  logout,
  getUsers,
};
