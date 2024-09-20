const { Admin } = require("../models/auth");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.split(" ").join("-");

    cb(null, `${Date.now()}-${fileName}`);
  },
});

const upload = multer({ storage });

const getUsers = async (req, res) => {
  try {
    const users = await Admin.find();
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get users" });
  }
};

const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Admin.findById(id);
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get user" });
  }
};

const getDelegateUsers = async (req, res) => {
  try {
    const users = await Admin.find({ role: "delegate" }, { password: 0 });
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get users" });
  }
};

const register = async (req, res) => {
  const { username, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields." });
    }

    const existingName = await Admin.findOne({ username });
    if (existingName) {
      return res.status(400).json({ message: "Username already taken" });
    }

    if (!["admin", "delegate"].includes(role)) {
      return res.status(400).json({ message: "Invalid role specified." });
    }

    const existingUser = await Admin.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use." });
    }

    const user = new Admin({
      username,
      email,
      password: hashedPassword,
      role,
    });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error occurred." });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, password } = req.body;

  try {
    const user = await Admin.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (username) {
      const existingName = await Admin.findOne({ username });
      if (existingName && existingName._id.toString() !== id) {
        return res.status(400).json({ message: "Username already taken" });
      }
      user.username = username;
    }

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    if (req.file) {
      const fileName = req.file.filename;
      const basePath = `${req.protocol}://${req.get("host")}/public/images/`;
      user.avatar = `${basePath}${fileName}`;
    }

    await user.save();
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to update user" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Admin.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Email or password is incorrect" });
    }

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
    res.status(500).json({ message: "Server error occurred" });
  }
};

const logout = async (req, res) => {
  res.clearCookie("token").json({ message: "Logged out successfully" });
};

const currentUser = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Not Authenticated" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Admin.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error occurred" });
  }
};

module.exports = {
  register,
  login,
  logout,
  getUsers,
  getUser,
  getDelegateUsers,
  currentUser,
  updateUser,
  upload,
};
