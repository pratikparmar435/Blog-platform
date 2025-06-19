const { blogSchema } = require("./schema");
const ExpressError = require("./utils/expressError");

//Verify Authentication middleware
function verifyUser(req, res, next) {
  if (!req.session.userId) {
    req.flash("error", "You must be logged in");
    return res.redirect("/login");
  }
  next();
}

//Schema validation middleware for blogs
function validateBlog(req, res, next) {
  let { error } = blogSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
}

module.exports = { validateBlog, verifyUser };
