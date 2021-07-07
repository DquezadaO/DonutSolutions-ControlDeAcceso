import express from 'express';
import { validate } from 'express-validation';

import { scheduleVisit, getVisits, editScheduleVisit, deleteVisit } from './resident.controller';
import { scheduleVisitValidate, editScheduleVisitValidate } from './resident.validator';

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

//=
// Put
//=
router.put(
  '/scheduleVisit/:visitScheduleId',
  validate(editScheduleVisitValidate),
  editScheduleVisit,
);

//=
// Delete
//=
router.delete('/visit/:visitId', deleteVisit);

export default router;
