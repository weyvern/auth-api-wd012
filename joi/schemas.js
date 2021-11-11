import Joi from 'joi';

export const signUpBody = Joi.object().keys({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required()
});
