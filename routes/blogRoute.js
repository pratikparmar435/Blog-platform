const express = require("express");
const router = express.Router();
const { getAllBlogs } = require("../controller/blog");

router.route("/").get(getAllBlogs);

module.exports = router;
