const express = require("express");
const router = express.Router();
const Blog = require("../models/blogs");

const {
  getAllBlogs,
  createNewBlog,
  showSingleBlog,
  editBlog,
  deleteBlog,
} = require("../controller/blog");

router.route("/").get(getAllBlogs);

//new route
router.get("/new", (req, res) => {
  res.render("blog/new.ejs");
});
router.route("/").post(createNewBlog);

//show route
router.route("/:id/show").get(showSingleBlog);

//edit route
router.get("/:id/edit", async (req, res) => {
  let { id } = req.params;
  let toEditBlog = await Blog.findById(id);
  res.render("blog/edit.ejs", { toEditBlog });
});

router.route("/:id").put(editBlog);

router.route("/:id").delete(deleteBlog);

module.exports = router;
