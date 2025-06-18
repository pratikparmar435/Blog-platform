const User = require("../models/user");

//sign-up route logic
let createUser = async (req, res) => {
  let { username, email, password } = req.body;
  console.log(username, email, password);
};

module.exports = { createUser };
