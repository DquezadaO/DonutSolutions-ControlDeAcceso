import express from 'express';
import { validate } from 'express-validation';

import { scheduleVisit, getVisits } from './resident.controller';
import { scheduleVisitValidate } from './resident.validator';

const router = express.Router();

//= ===============================
// Authentication routes
//= ===============================

//=
// Get
//=
router.get('/:residentId/visits', getVisits);

//=
// Post
//=
router.post('/scheduleVisit', validate(scheduleVisitValidate), scheduleVisit);

export default router;
