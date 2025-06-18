const express = require("express");
const router = express.Router();
const Blog = require("../models/blogs");
const wrapAsync = require("../utils/wrapAsync");
const { blogSchema } = require("../schema");
const ExpressError = require("../utils/expressError");

const {
  getAllBlogs,
  createNewBlog,
  showSingleBlog,
  editBlog,
  deleteBlog,
} = require("../controller/blog");

const validateBlog = (req, res, next) => {
  let { error } = blogSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

router.route("/").get(wrapAsync(getAllBlogs));

//new route
router.get("/new", (req, res) => {
  res.render("blog/new");
});
router.route("/").post(validateBlog, wrapAsync(createNewBlog));

//show route
router.route("/:id/show").get(wrapAsync(showSingleBlog));

//edit route
router.get(
  "/:id/edit",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let toEditBlog = await Blog.findById(id);
    res.render("blog/edit", { toEditBlog });
  })
);

router.route("/:id").put(validateBlog, wrapAsync(editBlog));

router.route("/:id").delete(wrapAsync(deleteBlog));

module.exports = router;
