const Blog = require("../models/blogs");

let getAllBlogs = async (req, res) => {
  let allBlogs = await Blog.find({});
  res.render("blog/home", { allBlogs });
};

let createNewBlog = async (req, res) => {
  let newBlog = new Blog(req.body);
  await newBlog.save();
  req.flash("success", "New Blog created successfully");
  res.redirect("/blogs");
};

let showSingleBlog = async (req, res) => {
  let { id } = req.params;
  let showBlog = await Blog.findById(id);
  if (!showBlog) {
    req.flash("error", "NO Blog found!");
    return res.redirect("/blogs");
  }
  res.render("blog/show", { showBlog });
};

let editBlog = async (req, res) => {
  let { id } = req.params;
  let editedBlog = req.body;
  editedBlog.updatedAt = new Date();
  await Blog.findByIdAndUpdate(id, editedBlog);
  req.flash("update", "Blog edited successfully");
  res.redirect(`/blogs/${id}/show`);
};

let deleteBlog = async (req, res) => {
  let { id } = req.params;
  await Blog.findByIdAndDelete(id);
  req.flash("deletion", "Blog deleted successfully");
  res.redirect("/blogs");
};

module.exports = {
  getAllBlogs,
  createNewBlog,
  showSingleBlog,
  editBlog,
  deleteBlog,
};
