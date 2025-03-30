const { user } = require("../models/usermodel.js");

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
