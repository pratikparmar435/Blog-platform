const express = require("express");
const router = express.Router();
const { getAllBlogs, createNewBlog } = require("../controller/blog");

router.route("/").get(getAllBlogs);
router.get("/new", (req, res) => {
  res.render("blog/new.ejs");
});
router.route("/").post(createNewBlog);

module.exports = router;
