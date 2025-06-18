const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date(Date.now()),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});

let Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
