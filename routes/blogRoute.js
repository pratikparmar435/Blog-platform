const express = require("express");
const router = express.Router();
const {
  getAllBlogs,
  createNewBlog,
  showSingleBlog,
} = require("../controller/blog");

router.route("/").get(getAllBlogs);
//new route
router.get("/new", (req, res) => {
  res.render("blog/new.ejs");
});
router.route("/").post(createNewBlog);
//show route
router.route("/:id/show").get(showSingleBlog);

module.exports = router;
