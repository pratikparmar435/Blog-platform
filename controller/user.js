const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = "catLover";

//sign-up route logic
let createUser = async (req, res) => {
  let { username, email, password } = req.body;
  let hashedPassword = await bcrypt.hash(password, 12);
  let newUser = new User({ username, email, password: hashedPassword });
  await newUser.save(newUser);
  req.flash("success", "You are registered!");
  res.redirect("/login");
};

let loginUser = async (req, res) => {
  let { username, password } = req.body;
  let currUser = await User.findOne({ username: username });
  if (!currUser) {
    req.flash("error", "User not found!");
    return res.redirect("/login");
  }
  let isValid = await bcrypt.compare(password, currUser.password);
  if (isValid) {
    req.session.userId = currUser._id;
    req.session.save((err) => {
      if (err) {
        console.log("Session save error:", err);
        return res.redirect("/login");
      }
      res.redirect("/blogs");
    });
  } else {
    req.flash("deletion", "Invalid username or password~");
    return res.redirect("/login");
  }
};

module.exports = { createUser, loginUser };
