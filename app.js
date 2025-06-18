const express = require("express");
const app = express();
const port = 5000;
const mongoose = require("mongoose");
const path = require("path");
const engine = require("ejs-mate");
const blogRoutes = require("./routes/blogRoute");
const methodOverride = require("method-override");
const ExpressError = require("./utils/expressError");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.engine("ejs", engine);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/blog-platform");
}

app.use("/blogs", blogRoutes);

app.get("/", (req, res) => {
  res.send("Working");
});

app.listen(port, () => {
  console.log("Server Activated!");
});

//Error handlers
app.use((req, res, next) => {
  next(new ExpressError(404, "Page not found!"));
});

app.use((err, req, res, next) => {
  let { status = 500, message = "Something went wrong try again!" } = err;
  res.status(status).render("error.ejs", { message });
});
