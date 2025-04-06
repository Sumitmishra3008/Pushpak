const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Captain } = require("../models/captainmodel");

module.exports.registerCaptain = async (fullname, email, password, vehicle) => {
  const captain = new Captain({
    fullname: {
      firstname: fullname.firstname,
      lastname: fullname.lastname,
    },
    email,
    vehicle,
  });
  const hashPassword = await captain.createhash(password);
  captain.password = hashPassword;
  const newCaptain = await captain.save();
  //   const token = await newCaptain.generateAuthToken();
  return newCaptain;
};
