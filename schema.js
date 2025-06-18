const joi = require("joi");

const blogSchema = joi.object({
  title: joi.string().required(),
  content: joi.string().required(),
  createdAt: joi.date(),
  updatedAt: joi.date(),
});

const userSchema = joi.object({
  username: joi.string().required(),
  email: joi.string().required(),
  password: joi.string().required(),
});

module.exports = { blogSchema, userSchema };
