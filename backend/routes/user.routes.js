const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const usercontroller = require("../controllers/user.controller.js");
router.use(express.json());
const User = require("../models/usermodel.js");
const authmiddleware = require("../middlewares/auth.middleware.js");
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
  ],
  usercontroller.registerUser
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  usercontroller.loginUser
);

router.get("/logout", authmiddleware, usercontroller.logoutUser);
router.get("/getuser", authmiddleware, usercontroller.getUser);

module.exports = router;
