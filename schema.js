const joi = require("joi");

const blogSchema = joi.object({
  title: joi.string().required(),
  content: joi.string().required(),
  createdAt: joi.date(),
  updatedAt: joi.date(),
});

module.exports = { blogSchema };
