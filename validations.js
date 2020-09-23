//Validation
const Joi = require('@hapi/joi');

const RegisterValidationSchema = Joi.object({
  username : Joi.string()
                .min(6)
                .alphanum()
                .required(),
  email : Joi.string().min(6).required().email(),
  password : Joi.string().min(6).required(),
  role   : Joi.string()
});

const LoginValidationSchema = Joi.object({
  username : Joi.string()
                .min(6)
                .alphanum()
                .required(),
  password : Joi.string().min(6).required(),
});

module.exports = {
  RegisterValidationSchema,
  LoginValidationSchema
};
