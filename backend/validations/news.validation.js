const Joi = require("joi");

const createNews = {
  body: Joi.object().keys({
    title: Joi.string().required().min(10).max(200),
    content: Joi.string().required().min(20),
    category: Joi.string().required(),
    author: Joi.string().required(),
    media_src: Joi.string().uri().allow(""),
  }),
};

const updateNews = {
  params: Joi.object().keys({
    id: Joi.string().required().custom((value, helpers) => {
      if (!value.match(/^[0-9a-fA-F]{24}$/)) {
        return helpers.message('"id" must be a valid mongo id');
      }
      return value;
    }),
  }),
  body: Joi.object().keys({
    title: Joi.string().min(10).max(200),
    content: Joi.string().min(20),
    category: Joi.string(),
    author: Joi.string(),
    media_src: Joi.string().uri().allow(""),
  }).min(1),
};

module.exports = {
  createNews,
  updateNews,
};
