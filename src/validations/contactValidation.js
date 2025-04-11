const Joi = require('joi');

// Define the validation schema
const contactRequestSchema = Joi.object({
  name: Joi.string().min(2).max(50).required()
    .messages({
      'string.empty': 'Name is required',
      'string.min': 'Name should have at least {#limit} characters',
      'string.max': 'Name should not exceed {#limit} characters'
    }),
  email: Joi.string().email().required()
    .messages({
      'string.empty': 'Email is required',
      'string.email': 'Please provide a valid email address'
    }),
  phone: Joi.string().pattern(/^[0-9]{10,15}$/).required()
    .messages({
      'string.empty': 'Phone number is required',
      'string.pattern.base': 'Phone number should be between 10-15 digits'
    }),
  country: Joi.string().min(2).max(50).required()
    .messages({
      'string.empty': 'Country is required',
      'string.min': 'Country name too short',
      'string.max': 'Country name too long'
    }),
  service: Joi.string().min(2).max(50).optional()
    .messages({
      'string.min': 'Service name too short',
      'string.max': 'Service name too long'
    })
});