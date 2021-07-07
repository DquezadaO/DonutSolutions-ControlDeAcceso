import express from 'express';
import { validate } from 'express-validation';
import multer from 'multer';

import {
  detectLicensePlate,
  getCondominiumVisits,
  newVisitEntry,
  newProviderEntry,
  uploadFileToS3,
  registerEntry,
  getCondominiumEntries,
} from './guard.controller';
import {
  detectLicensePlateValidate,
  newVisitEntryValidate,
  newProviderEntryValidate,
  registerEntryValidate,
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
router.get('/getCondominiumEntries', getCondominiumEntries);
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
router.post('/registerEntry', validate(registerEntryValidate), registerEntry);

export default router;
