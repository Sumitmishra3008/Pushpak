const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { Captain } = require("../models/captainmodel");
const captaincontroller = require("../controllers/captain.controller");
const captainAuthMiddleware = require("../middlewares/captain.middleware");
router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
    body("vehicle.vehicletype")
      .isIn(["car", "bike", "auto"])
      .withMessage("Please enter a valid vehicle type"),
  ],
  captaincontroller.registerCaptain
);

module.exports = router;
