const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const captainSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, "must be at least 3 characters"],
    },
    lastname: {
      type: String,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "must be at least 6 characters"],
  },
  vehicle: {
    vehicletype: {
      type: String,
      required: true,
      enum: ["car", "bike", "auto"],
    },
    vehiclecapacity: {
      type: Number,
      required: true,
    },
    vehiclebrand: {
      type: String,
      required: true,
    },
    vehiclemodel: {
      type: String,
      required: true,
    },
    vehiclenumber: {
      type: String,
      required: true,
      unique: true,
    },
    vehiclecolor: {
      type: String,
      required: true,
    },
  },
  socketid: {
    type: String,
  },
  isactive: {
    type: Boolean,
    default: false,
  },
  location: {
    ltd: {
      type: Number,
    },
    lng: {
      type: Number,
    },
  },
});

captainSchema.methods.createhash = async function (password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

captainSchema.methods.comparePassword = async function (password) {
  const isMatch = await bcrypt.compare(password, this.password);
  return isMatch;
};

captainSchema.methods.generateAuthToken = async function () {
  const token = await jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return token;
};

const Captain = mongoose.model("Captain", captainSchema);

module.exports = {
  Captain: Captain,
};
