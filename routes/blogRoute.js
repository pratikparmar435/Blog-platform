const express = require("express");
const router = express.Router();
const Blog = require("../models/blogs");
const wrapAsync = require("../utils/wrapAsync");
const { validateBlog, verifyUser } = require("../middleware");

const {
  getAllBlogs,
  createNewBlog,
  showSingleBlog,
  editBlog,
  deleteBlog,
} = require("../controller/blog");

router.route("/").get(wrapAsync(getAllBlogs));

//new route
router.get("/new", verifyUser, (req, res) => {
  res.render("blog/new");
});

router.route("/").post(verifyUser, validateBlog, wrapAsync(createNewBlog));

//show route
router.route("/:id/show").get(wrapAsync(showSingleBlog));

//edit route
router.get(
  "/:id/edit",
  verifyUser,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let toEditBlog = await Blog.findById(id);
    if (!toEditBlog) {
      req.flash("error", "NO Blog found!");
      return res.redirect("/blogs");
    }
    res.render("blog/edit", { toEditBlog });
  })
);

router.route("/:id").put(verifyUser, validateBlog, wrapAsync(editBlog));

//delete route
router.route("/:id").delete(verifyUser, wrapAsync(deleteBlog));

module.exports = router;
