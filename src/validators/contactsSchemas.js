import Joi from 'joi';

const baseString = Joi.string().min(3).max(20);

export const createContactSchema = Joi.object({
  name: baseString.required(),
  phoneNumber: baseString.required(),
  email: baseString.email().min(3).max(50).optional(),
  isFavourite: Joi.boolean().optional(),
  contactType: Joi.string().valid('work', 'home', 'personal').optional(),
});

export const updateContactSchema = Joi.object({
  name: baseString.optional(),
  phoneNumber: baseString.optional(),
  email: baseString.email().min(3).max(50).optional(),
  isFavourite: Joi.boolean().optional(),
  contactType: Joi.string().valid('work', 'home', 'personal').optional(),
}).min(1);
