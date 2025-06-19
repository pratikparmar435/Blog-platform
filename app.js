const express = require("express");
const app = express();
const port = 5000;
const mongoose = require("mongoose");
const path = require("path");
const engine = require("ejs-mate");
const blogRoutes = require("./routes/blogRoute");
const methodOverride = require("method-override");
const ExpressError = require("./utils/expressError");
const session = require("express-session");
const secret = "iAmBatMan";
const flash = require("connect-flash");
const authRoutes = require("./routes/authRoute");

const sessionOption = {
  secret: secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.engine("ejs", engine);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
app.use(session(sessionOption));
app.use(flash());

//flash middleware
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.update = req.flash("update");
  res.locals.deletion = req.flash("deletion");
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.session.userId || null;
  next();
});

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/blog-platform");
}

app.use("/blogs", blogRoutes);
app.use("/", authRoutes);

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
