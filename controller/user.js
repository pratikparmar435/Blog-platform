const User = require("../models/user");
const bcrypt = require("bcrypt");

//sign-up route logic
let createUser = async (req, res) => {
  let { username, email, password } = req.body;
  let hashedPassword = await bcrypt.hash(password, 12);
  let newUser = new User({ username, email, password: hashedPassword });
  await newUser.save(newUser);
  req.flash("success", "You are registered!");
  res.redirect("/login");
};

module.exports = { createUser };
