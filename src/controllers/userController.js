const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user");

// @desc Get all contacts
// @route GET /api/contacts
// @access public
const registerUser = asyncHandler(async (req, res) => {
  const { email, username, fullName, password } = req.body;
  if (!email || !username || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }
  const isExist = await userModel.findOne({ email });
  if (isExist) {
    res.status(400);
    throw new Error("Email already exists, please login");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const data = await userModel.create({
    email,
    username,
    fullName,
    password: hashedPassword,
  });
  if (data) {
    res.status(200).json({ message: "User created", data });
  } else {
    res.status(400).json({ message: "User was not created" });
  }
});

// @desc Get all contacts
// @route GET /api/contacts
// @access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }
  const user = await userModel.findOne({ email });
  if (!user) {
    res.status(404);
    throw new Error("User doesn't exist");
  }
  if(user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign({
      user: {
        username: user?.username,
        email: user?.email,
        fullName: user?.fullName,
        id: user?. id
      }
    }, process.env.JWT, {expiresIn: '5m'})
    res.status(200).json({ accessToken, data: user });
  } else {
    res.status(401).json({ message: 'Email or password is wrong' });
  }
});

// @desc Get all contacts
// @route GET /api/contacts
// @access private
const userProfile = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "User found", data: req.user});
});

// @desc Get all contacts
// @route GET /api/contacts
// @access private
const updateProfile = asyncHandler(async (req, res) => {
  const contacts = await contactModel.find();
  res.status(200).json({ message: "Contacts found", data: contacts });
});

module.exports = { registerUser, loginUser, userProfile, updateProfile };
