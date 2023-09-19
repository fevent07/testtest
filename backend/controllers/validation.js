const Joi = require('joi');

// Validation for creating jobs
const jobValidation = Joi.object({
    company: Joi.string().required(),
    logo: Joi.string().required(),
    new: Joi.boolean().required(),
    featured: Joi.boolean().required(),
    position: Joi.string().required(),
    role: Joi.string().required(),
    level: Joi.string().required(),
    postedAt: Joi.date().required(),
    contract: Joi.string().required(),
    location: Joi.string().required(),
    languages: Joi.array().items(Joi.string()).required(),
    tools: Joi.array().items(Joi.string()).required()
  });


  // Validation for updating jobs
const jobUpdateValidation = Joi.object({
    company: Joi.string(),
    logo: Joi.string(),
    new: Joi.boolean(),
    featured: Joi.boolean(),
    position: Joi.string(),
    role: Joi.string(),
    level: Joi.string(),
    postedAt: Joi.date(),
    contract: Joi.string(),
    location: Joi.string(),
    languages: Joi.array().items(Joi.string()),
    tools: Joi.array().items(Joi.string())
  });


  module.exports ={
    jobValidation,
    jobUpdateValidation
}