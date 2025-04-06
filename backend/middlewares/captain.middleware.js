const { Captain } = require("../models/captainmodel");
const { blacklisttoken } = require("../models/blacklisttoken");
const jwt = require("jsonwebtoken");

const captainAuthMiddleware = async (req, res, next) => {
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
    const captain = await Captain.findOne({ _id: decoded._id });
    req.captain = captain;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = captainAuthMiddleware;
