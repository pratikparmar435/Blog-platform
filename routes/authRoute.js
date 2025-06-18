const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const { createUser } = require("../controller/user");

//signup routes
router.get("/signup", (req, res) => {
  res.render("user/signup");
});

router.route("/signup").post(wrapAsync(createUser));

module.exports = router;
