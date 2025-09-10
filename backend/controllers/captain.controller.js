const { Captain } = require("../models/captainmodel");
const { captainAuthMiddleware } = require("../middlewares/captain.middleware");
const { validationResult } = require("express-validator");
const captainservice = require("../services/captain.service");
const bcrypt = require("bcrypt");
const { blacklisttoken } = require("../models/blacklisttoken");

module.exports.registerCaptain = async (req, res) => {
  console.log(req.body);
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(422).json({ errors: errors.array() });
  }
  const { fullname, email, password, vehicle } = req.body;
  console.log(req.body);
  console.log(Captain);
  const captainExist = await Captain.findOne({ email });
  if (captainExist) {
    return res.status(400).json({ message: "Captain already exists" });
  }

  // const newCaptain2 = new Captain({
  //   fullname,
  //   email,
  //   vehicle,
  // });
  // const hashPassword = await newCaptain2.createhash(password);
  // newCaptain2.password = hashPassword;
  const newCaptain = await captainservice.registerCaptain(
    fullname,
    email,
    password,
    vehicle
  );
  console.log(newCaptain);
  const token = await newCaptain.generateAuthToken();
  res.status(201).json({
    token,
    message: "Captain registered successfully",
    captain: {
      id: newCaptain._id,
      fullname: newCaptain.fullname,
      email: newCaptain.email,
      vehicle: newCaptain.vehicle,
    },
  });
};

module.exports.loginCaptain = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  const captainExist = await Captain.findOne({ email }).select("+password");
  if (!captainExist) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  const isMatch = await captainExist.comparePassword(
    password,
    captainExist.password
  );
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  const token = await captainExist.generateAuthToken();
  res.status(200).json({
    token,
    message: "Captain logged in successfully",
    captain: {
      id: captainExist._id,
      fullname: captainExist.fullname,
      email: captainExist.email,
      vehicle: captainExist.vehicle,
    },
  });
};

module.exports.getCaptain = async (req, res) => {
  res.status(200).json(req.captain);
};

module.exports.logoutCaptain = async (req, res) => {
  const token =
    req.cookies?.token || req.headers["authorization"]?.split(" ")[1];
  const blacklisted = new blacklisttoken({ token });
  await blacklisted.save();
  res.status(200).json({ message: "Captain logged out successfully" });
};
