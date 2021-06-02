import { Joi } from 'express-validation';

const editUserValidate = {
  body: Joi.object({
    oldEmail: Joi.string().email().required(),
    firstName: Joi.string().allow(null),
    lastName: Joi.string().allow(null),
    email: Joi.string().email().allow(null),
    phone: Joi.string().allow(null),
    password: Joi.string().allow(null),
    role: Joi.string().allow(null),
    idUnit: Joi.number().allow(null),
  }),
};

const newUserValidate = {
  body: Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    password: Joi.string().required(),
    role: Joi.string().required(),
    id_unit: Joi.number().required(),
  }),
};

const deleteUserValidate = {
  body: Joi.object({
    id_user: Joi.number().required(),
  }),
};

const registerCarValidate = {
  body: Joi.object({
    id_unit: Joi.number().required(),
    license_plate: Joi.string().required(),
    car_brand: Joi.string().required(),
    car_model: Joi.string().required(),
    car_color: Joi.string().required(),
  }),
};

const addProviderValidate = {
  body: Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    run: Joi.string().required(),
    phone: Joi.string().required(),
    license_plate: Joi.string(),
  }),
};

export {
  newUserValidate,
  editUserValidate,
  deleteUserValidate,
  registerCarValidate,
  addProviderValidate,
};
