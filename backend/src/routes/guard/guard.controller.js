import { RekognitionClient, DetectTextCommand } from '@aws-sdk/client-rekognition';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

import { awsCredentials, awsRegion } from '../../helpers/constants';

const newVisitEntry = async (req, res) => {
  try {
    const { id_visita: visitId, id_residente: residentId } = req.body;

    // Check if visita exists
    const visita = await res.app.locals.orm.visit.findOne({
      where: { id: visitId },
      attributes: ['id', 'firstName', 'lastName', 'run', 'residentId'],
    });
    if (!visita) {
      return res.status(400).send({ error: 'model-error', message: 'Visit doesnt exists' });
    }

    // Check if residente exists
    const residente = await res.app.locals.orm.user.findOne({
      where: { id: residentId, role: 'residente' },
      attributes: ['id', 'firstName', 'lastName'],
    });
    if (!residente) {
      return res.status(400).send({ error: 'model-error', message: 'Resident doesnt exists' });
    }

    // Check if visit is related to the resident
    if (visita.residentId !== residentId) {
      return res
        .status(400)
        .send({ error: 'model-error', message: 'Resident not related to Visit' });
    }

    // Create Visit Ingreso record
    const newVisitEntry = {
      visitId,
      residentId,
      arrivalTime: new Date(),
    };
    const saved = await res.app.locals.orm.arrival.create(newVisitEntry);

    if (!saved) {
      return res.status(400).send({ error: 'model-error', message: 'Error creating new Arrival' });
    }

    const response = {
      data: {
        id_arrival: saved.id,
      },
    };
    return res.status(200).send(response);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: 'service-error', message: err });
  }
};

const newProviderEntry = async (req, res) => {
  try {
    const { id_provider: providerId, id_backoffice: backofficeId } = req.body;

    // Check if provider exists
    const provider = await res.app.locals.orm.provider.findOne({
      where: { id: providerId },
      attributes: ['id', 'firstName', 'lastName', 'run', 'backofficeId'],
    });
    if (!provider) {
      return res.status(400).send({ error: 'model-error', message: 'Provider doesnt exists' });
    }

    // Check if backoffice exists
    const backoffice = await res.app.locals.orm.user.findOne({
      where: { id: backofficeId, role: 'backoffice' },
      attributes: ['id', 'firstName', 'lastName'],
    });
    if (!backoffice) {
      return res.status(400).send({ error: 'model-error', message: 'Backoffice doesnt exists' });
    }

    // Check if provider is related to the backoffice
    if (provider.backofficeId !== backofficeId) {
      return res
        .status(400)
        .send({ error: 'model-error', message: 'Provider not related to Backoffice' });
    }

    // Create Provider Arrival record
    const newProviderEntry = {
      providerId,
      residentId: backofficeId,
      arrivalTime: new Date(),
    };
    const saved = await res.app.locals.orm.arrival.create(newProviderEntry);

    if (!saved) {
      return res.status(400).send({ error: 'model-error', message: 'Error creating new Arrival' });
    }

    const response = {
      data: {
        id_arrival: saved.id,
      },
    };
    return res.status(200).send(response);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: 'service-error', message: err });
  }
};

const detectLicensePlate = async (req, res) => {
  try {
    const { condominiumId, licensePlateFilename } = req.body;
    const rekognition = new RekognitionClient({ credentials: awsCredentials, region: awsRegion });
    const command = new DetectTextCommand({
      Image: {
        S3Object: {
          Bucket: process.env.LICENSE_PLATE_BUCKET_NAME,
          Name: licensePlateFilename,
        },
      },
    });
    const data = await rekognition.send(command);
    const detectedPlate = data.TextDetections[0].DetectedText.replace(/[^a-zA-Z0-9]/g, '');
    const cars = await res.app.locals.orm.car.findAll({
      where: {
        licensePlate: detectedPlate,
      },
      include: [
        {
          association: 'unit',
          require: true,
          where: {
            condominiumId: condominiumId,
          },
        },
      ],
    });
    if (cars.length) {
      return res.status(200).send({
        data: {
          isRegisteredCar: !!cars.length,
          licensePlate: detectedPlate,
          unitId: cars[0].unitId,
        },
      });
    } else {
      return res.status(200).send({
        data: { isRegisteredCar: false },
      });
    }
  } catch (err) {
    return res.status(500).send(err);
  }
};

const getCondominiumVisits = async (req, res) => {
  try {
    const role = res.locals.role;

    // Check valid role
    if (role !== 'guardia') {
      return res.status(400).send({ error: 'model-error', message: 'User is not guardia' });
    }

    // Get user instance
    const user = await res.locals.getUser(null);

    const unit = await res.app.locals.orm.unit.findOne({
      where: { id: user.unitId },
    });
    if (!unit) {
      return res.status(400).send({ error: 'model-error', message: 'Unit doesnt exists' });
    }

    console.error('CONDOMINIO: ', unit.condominiumId);

    const { condominiumId } = unit;

    // Get visits from a condominium
    const visits = await res.app.locals.orm.visit.findAll({
      include: [
        {
          association: 'resident',
          attributes: ['unitId'],
          require: false,
          include: [
            {
              association: 'unit',
              attributes: ['id', 'condominiumId'],
              where: {
                condominiumId,
              },
              require: false,
            },
          ],
        },
        {
          association: 'visitSchedule',
          attributes: ['start', 'end'],
          require: false,
        },
      ],
    });
    const response = {
      data: visits,
    };

    return res.status(200).send(response);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: 'service-error', message: err });
  }
};

const uploadFileToS3 = async (req, res) => {
  try {
    const client = new S3Client({ credentials: awsCredentials, region: awsRegion });
    const { buffer, originalname } = req.file;
    const command = new PutObjectCommand({
      Bucket: process.env.LICENSE_PLATE_BUCKET_NAME,
      Key: originalname,
      Body: buffer,
    });
    const response = await client.send(command);
    return res.status(200).send({ filename: originalname, successful: !!response });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: 'service-error', message: err });
  }
};

const scheduleVisit = async (req, res) => {
  const {
    firstName,
    lastName,
    run,
    phone,
    licensePlate,
    scheduleStart,
    scheduleEnd,
    residentId,
  } = req.body;

  const visit = await res.app.locals.orm.visit.create({
    firstName,
    lastName,
    run,
    phone,
    licensePlate,
    residentId,
  });

  await res.app.locals.orm.visitSchedule.create({
    start: scheduleStart,
    end: scheduleEnd,
    visitId: visit.id,
  });

  return res.status(201).send();
};

export {
  detectLicensePlate,
  getCondominiumVisits,
  newVisitEntry,
  newProviderEntry,
  uploadFileToS3,
  scheduleVisit,
};
