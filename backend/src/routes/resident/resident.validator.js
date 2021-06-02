import { Joi } from 'express-validation';

export const scheduleVisitValidate = {
  body: Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    run: Joi.string().required(),
    phone: Joi.string(),
    licensePlate: Joi.string(),
    scheduleStart: Joi.date().required(),
    scheduleEnd: Joi.date().required(),
  }),
};
