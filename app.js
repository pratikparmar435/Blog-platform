const express = require("express");
const app = express();
const port = 5000;
const mongoose = require("mongoose");
const path = require("path");
const engine = require("ejs-mate");
const blogRoutes = require("./routes/blogRoute");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.engine("ejs", engine);
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/blog-platform");
}

app.use("/blogs", blogRoutes);

app.listen(port, () => {
  console.log("Server Activated!");
});
