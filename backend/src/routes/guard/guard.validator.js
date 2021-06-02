import { Joi } from 'express-validation';

const detectLicensePlateValidate = {
  body: Joi.object({
    licensePlateFilename: Joi.string().required(),
    condominiumId: Joi.number().required(),
  }),
};

const newVisitEntryValidate = {
  body: Joi.object({
    id_visita: Joi.number().required(),
    id_residente: Joi.number().required(),
  }),
};

const newProviderEntryValidate = {
  body: Joi.object({
    id_provider: Joi.number().required(),
    id_backoffice: Joi.number().required(),
  }),
};

const scheduleVisitValidate = {
  body: Joi.object({
    firstName: Joi.string().required(),
    residentId: Joi.number().required(),
    lastName: Joi.string().required(),
    run: Joi.string().required(),
    phone: Joi.string(),
    licensePlate: Joi.string(),
    scheduleStart: Joi.date().required(),
    scheduleEnd: Joi.date().required(),
  }),
};

export { detectLicensePlateValidate, newVisitEntryValidate, newProviderEntryValidate, scheduleVisitValidate };
