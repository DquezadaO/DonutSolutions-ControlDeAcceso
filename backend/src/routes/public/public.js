import express from 'express';
import { validate } from 'express-validation';

import { login } from './public.controller';
import { loginValidate } from './public.validator';

const router = express.Router();

//= ===============================
// Authentication routes
//= ===============================

//=
// Get
//=

//=
// Post
//=
router.post('/login', validate(loginValidate), login);

export default router;
