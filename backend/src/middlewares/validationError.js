import { ValidationError } from 'express-validation';

const validationError = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    const error = {
      error: err.name,
      message: err.details.body[0].message,
    };
    return res.status(err.statusCode).json(error);
  }
  next();
};

export default validationError;
