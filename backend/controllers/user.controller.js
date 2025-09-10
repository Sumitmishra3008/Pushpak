const { user } = require("../models/usermodel.js");
const userservice = require("../services/user.service.js");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.registerUser = async (req, res) => {
  console.log(req.body);
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const { fullname, email, password } = req.body;
  const userExist = await user.findOne({ email });
  if (userExist) {
    return res.status(400).json({ message: "User already exists" });
  }
  // console.log(user.comparepassword);
  // const hashPassword = await bcrypt.hash(password, 10);
  const newUser = new user({
    fullname: {
      firstname: fullname.firstname,
      lastname: fullname.lastname,
    },
    email,
  });
  const hashPassword2 = await newUser.createhash(password);
  newUser.password = hashPassword2;
  const newUser2 = await userservice.createUser(
    fullname.firstname,
    fullname.lastname,
    email,
    hashPassword2
  );
  const token = await newUser2.generateAuthToken();
  res.status(201).json({
    message: "User registered successfully",
    token,
    user: {
      id: newUser2._id,
      fullname: newUser2.fullname,
      email: newUser2.email,
    },
  });
};

module.exports.loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  const userExist = await user.findOne({ email }).select("+password");
  if (!userExist) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  const isMatch = await userExist.comparePassword(password, userExist.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  const token = await userExist.generateAuthToken();
  res.status(200).json({
    message: "User logged in successfully",
    token,
    user: {
      id: userExist._id,
      fullname: userExist.fullname,
      email: userExist.email,
    },
  });
};

module.exports.getUser = async (req, res) => {
  res.status(200).json(req.user);
};

module.exports.logoutUser = async (req, res) => {
  const token =
    req.cookies?.token || req.headers["authorization"]?.split(" ")[1];
  if (token) {
    userservice.blacklisttoken(token);
  }
  res.clearCookie("token");
  res.status(200).json({ message: "User logged out successfully" });
};
