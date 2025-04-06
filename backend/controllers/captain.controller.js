const { Captain } = require("../models/captainmodel");
const { captainAuthMiddleware } = require("../middlewares/captain.middleware");
const { validationResult } = require("express-validator");
const captainservice = require("../services/captain.service");
const bcrypt = require("bcrypt");

module.exports.registerCaptain = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
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
