const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const { createUser, loginUser } = require("../controller/user");

//signup routes
router.get("/signup", (req, res) => {
  res.render("user/signup");
});

router.route("/signup").post(wrapAsync(createUser));

//login routes
router.get("/login", (req, res) => {
  res.render("user/login.ejs");
});

router.route("/login").post(wrapAsync(loginUser));
module.exports = router;
