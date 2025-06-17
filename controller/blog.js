const Blog = require("../models/blogs");

let getAllBlogs = async (req, res) => {
  let allBlogs = await Blog.find({});
  res.render("blog/home", { allBlogs });
};

let createNewBlog = async (req, res) => {
  let newBlog = new Blog(req.body);
  await newBlog.save();
  res.redirect("/blogs");
};

let showSingleBlog = async (req, res) => {
  let { id } = req.params;
  let showBlog = await Blog.findById(id);
  res.render("blog/show.ejs", { showBlog });
};

let editBlog = async (req, res) => {
  let { id } = req.params;
  let editedBlog = req.body;
  editedBlog.updatedAt = new Date();
  await Blog.findByIdAndUpdate(id, editedBlog);
  res.redirect("/blogs");
};

module.exports = { getAllBlogs, createNewBlog, showSingleBlog, editBlog };
