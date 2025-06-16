const Blog = require("../models/blogs");

let getAllBlogs = async (req, res) => {
  let allBlogs = await Blog.find({});
  res.render("blog/home", { allBlogs });
};

module.exports = { getAllBlogs };
