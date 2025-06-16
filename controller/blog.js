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

module.exports = { getAllBlogs, createNewBlog };
