import express from 'express';

import { getUsers, getUnits } from './shared.controller';

const router = express.Router();

//= ===============================
// Authentication routes
//= ===============================

//=
// Get
//=
router.get('/users', getUsers);
router.get('/units', getUnits);

export default router;
