const { user } = require("../models/usermodel.js");
const userservice = require("../services/user.service.js");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const { fullname, email, password } = req.body;
  const userExist = await user.findOne({ email });
  if (userExist) {
    return res.status(400).json({ message: "User already exists" });
  }
  console.log(user.comparepassword);
  //   const hashPassword = await user.hashPassword(password);
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await userservice.createUser(
    fullname.firstname,
    fullname.lastname,
    email,
    hashPassword
  );
  const token = await newUser.generateAuthToken();
  res.status(201).json({
    message: "User registered successfully",
    token,
    user: {
      id: newUser._id,
      fullname: newUser.fullname,
      email: newUser.email,
    },
  });
};
