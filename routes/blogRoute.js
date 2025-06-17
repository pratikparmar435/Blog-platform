const express = require("express");
const router = express.Router();
const Blog = require("../models/blogs");
const wrapAsync = require("../utils/wrapAsync");
const {
  getAllBlogs,
  createNewBlog,
  showSingleBlog,
  editBlog,
  deleteBlog,
} = require("../controller/blog");

router.route("/").get(wrapAsync(getAllBlogs));

//new route
router.get("/new", (req, res) => {
  res.render("blog/new.ejs");
});
router.route("/").post(wrapAsync(createNewBlog));

//show route
router.route("/:id/show").get(wrapAsync(showSingleBlog));

//edit route
router.get(
  "/:id/edit",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let toEditBlog = await Blog.findById(id);
    res.render("blog/edit.ejs", { toEditBlog });
  })
);

router.route("/:id").put(wrapAsync(editBlog));

router.route("/:id").delete(wrapAsync(deleteBlog));

module.exports = router;
