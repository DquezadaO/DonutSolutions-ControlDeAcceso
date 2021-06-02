import express from 'express';
import { validate } from 'express-validation';

import {
  newUser,
  editUser,
  deleteUser,
  registerCar,
  getCondominiumCars,
  addProvider,
  getProviders,
} from './backoffice.controller';
import {
  newUserValidate,
  editUserValidate,
  deleteUserValidate,
  registerCarValidate,
  addProviderValidate,
} from './backoffice.validator';

const router = express.Router();

//= ===============================
// Authentication routes
//= ===============================

//=
// Get
//=
router.get('/getCars', getCondominiumCars);
router.get('/getProviders', getProviders);

//=
// Post
//=
// Create a new User with the given attributes
router.post('/newUser', validate(newUserValidate), newUser);
// Edit a User with the given attributes
router.post('/editUser', validate(editUserValidate), editUser);
// Delete a User with the given userId
router.post('/deleteUser', validate(deleteUserValidate), deleteUser);
// Create a new Car and assign it to a Resident
router.post('/registerCar', validate(registerCarValidate), registerCar);
// Add a new Provider
router.post('/addProvider', validate(addProviderValidate), addProvider);

export default router;
