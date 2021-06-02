import express from 'express';
import { validate } from 'express-validation';
import multer from 'multer';

import {
  detectLicensePlate,
  getCondominiumVisits,
  newVisitEntry,
  newProviderEntry,
  uploadFileToS3,
  scheduleVisit,
} from './guard.controller';
import {
  detectLicensePlateValidate,
  newVisitEntryValidate,
  newProviderEntryValidate,
  scheduleVisitValidate,
} from './guard.validator';

const extractFile = multer({
  storage: multer.memoryStorage(),
});

const router = express.Router();

//= ===============================
// Authentication routes
//= ===============================

//=
// Get
//=
router.get('/getCondominiumVisits', getCondominiumVisits);
//=
// Post
//=
// Uploads image to S3 bucket
router.post('/uploadImage', [extractFile.single('file')], uploadFileToS3);
// Returns detected text from S3 image
router.post('/detectLicensePlate', validate(detectLicensePlateValidate), detectLicensePlate);
// Create a new Visit Entry with the given attributes
router.post('/newVisitEntry', validate(newVisitEntryValidate), newVisitEntry);
// Create a new Provider Entry with the given attributes
router.post('/newProviderEntry', validate(newProviderEntryValidate), newProviderEntry);
router.post('/scheduleVisit', validate(scheduleVisitValidate), scheduleVisit);

export default router;
