const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { user } = require("../models/usermodel.js");
const { blacklisttoken } = require("../models/blacklisttoken.js");

const authmiddleware = async (req, res, next) => {
  const token = req.cookies || req.headers["authorization"]?.split(" ")[1];
  const ispresent = await blacklisttoken.findOne({ token: token });
  if (ispresent != null) {
    console.log(ispresent);
    console.log("Token is blacklisted");
    return res.status(401).json({ message: "Unauthorized" });
  }
  if (!token) {
    console.log("Token not found");
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    const User = await user.findOne({ _id: decoded._id });
    req.user = User;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: "Unauthorized" });
  }
};
module.exports = authmiddleware;
