const { user } = require("../models/usermodel.js");
const { blacklisttoken } = require("../models/blacklisttoken.js");

module.exports.createUser = async (firstname, lastname, email, password) => {
  const newUser = new user({
    fullname: {
      firstname,
      lastname,
    },
    email,
    password,
  });
  await newUser.save();
  return newUser;
};

module.exports.blacklisttoken = async (token) => {
  const newToken = new blacklisttoken({
    token,
  });
  await newToken.save();
  return newToken;
};
