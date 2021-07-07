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

const registerEntryValidate = {
  body: Joi.object({
    unitId: Joi.number().required(),
    type: Joi.string().valid('visit', 'resident').required(),
    licensePlate: Joi.string().optional(),
    visitId: Joi.number().optional(),
    visit: Joi.object({
      firstName: Joi.string(),
      lastName: Joi.string(),
      run: Joi.string(),
      phone: Joi.string().allow(''),
      licensePlate: Joi.string(),
    }).optional(),
  }),
};

export {
  detectLicensePlateValidate,
  newVisitEntryValidate,
  newProviderEntryValidate,
  registerEntryValidate,
};
