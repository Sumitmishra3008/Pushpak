const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { Captain } = require("../models/captainmodel");
const captaincontroller = require("../controllers/captain.controller");
const captainAuthMiddleware = require("../middlewares/captain.middleware");
const cors = require("cors");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(cors());

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

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  captaincontroller.loginCaptain
);

module.exports = router;

router.get("/getcaptain", captainAuthMiddleware, captaincontroller.getCaptain);

router.get("/logout", captainAuthMiddleware, captaincontroller.logoutCaptain);
