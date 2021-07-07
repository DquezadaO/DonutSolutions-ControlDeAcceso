import { Joi } from 'express-validation';

const editUserValidate = {
  body: Joi.object({
    email: Joi.string().email(),
    firstName: Joi.string().allow(null),
    lastName: Joi.string().allow(null),
    phone: Joi.string().allow(null),
    // unitId: Joi.number(),
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

const registerCarValidate = {
  body: Joi.object({
    id_unit: Joi.number().required(),
    license_plate: Joi.string().required(),
    car_brand: Joi.string().required(),
    car_model: Joi.string().required(),
    car_color: Joi.string().required(),
  }),
};

const editCarValidate = {
  body: Joi.object({
    licensePlate: Joi.string().required(),
    unitId: Joi.number(),
    carBrand: Joi.string(),
    carModel: Joi.string(),
    carColor: Joi.string(),
  }),
};

const deleteCarValidate = {
  body: Joi.object({
    licensePlate: Joi.string().required(),
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
  registerCarValidate,
  editCarValidate,
  deleteCarValidate,
  addProviderValidate,
};
