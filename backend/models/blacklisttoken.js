const mongoose = require("mongoose");

const blacklistTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  expiresAt: {
    type: Date,
    default: Date.now,
    expires: "24h", // Automatically remove the token after 1 hour
  },
});

const blacklisttoken = mongoose.model("BlacklistToken", blacklistTokenSchema);
module.exports = {
  blacklisttoken: blacklisttoken,
};
