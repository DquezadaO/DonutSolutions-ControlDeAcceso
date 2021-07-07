import express from 'express';
import { validate } from 'express-validation';

import {
  newUser,
  editUser,
  deleteUser,
  registerCar,
  editCar,
  deleteCar,
  getCondominiumCars,
  addProvider,
  getProviders,
} from './backoffice.controller';
import {
  newUserValidate,
  editUserValidate,
  registerCarValidate,
  editCarValidate,
  deleteCarValidate,
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
// Create a new Car and assign it to a Resident
router.post('/registerCar', validate(registerCarValidate), registerCar);
// Add a new Provider
router.post('/addProvider', validate(addProviderValidate), addProvider);

//=
// Put
//=
// Edit an existing Car
router.put('/editCar', validate(editCarValidate), editCar);
// Edit a User with the given attributes
router.put('/user/:id', validate(editUserValidate), editUser);

//=
// Delete
//=
// Delete a car
router.post('/deleteCar', validate(deleteCarValidate), deleteCar);
// Delete a User with the given userId
router.delete('/user/:id', deleteUser);

export default router;
