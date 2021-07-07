import { pickByNotNullOrUndefined } from '../../helpers/utils';
//=
// Get
//=
const getVisits = async (req, res) => {
  try {
    const { residentId } = req.params;
    const userId = parseInt(residentId, 10);

    // const userId = res.locals.userId;

    // Check resident exists
    const resident = await res.app.locals.orm.user.findOne({
      where: { id: userId, role: 'residente' },
    });
    if (!resident) {
      return res.status(400).send({ error: 'model-error', message: 'Resident not found' });
    }

    // Get all visits associated to the resident, with their schedules
    const visits = await res.app.locals.orm.visit.findAll({
      where: {
        residentId: userId,
      },
      include: [
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

//=
// Post
//=
const scheduleVisit = async (req, res) => {
  const { firstName, lastName, run, phone, licensePlate, scheduleStart, scheduleEnd } = req.body;

  const userId = res.locals.userId;

  const visit = await res.app.locals.orm.visit.create({
    firstName,
    lastName,
    run,
    phone,
    licensePlate,
    residentId: userId,
  });

  await res.app.locals.orm.visitSchedule.create({
    start: scheduleStart,
    end: scheduleEnd,
    visitId: visit.id,
  });

  return res.status(201).send();
};

//=
// Put
//=
const editScheduleVisit = async (req, res) => {
  const newValues = {
    start: req.body.scheduleStart,
    end: req.body.scheduleEnd,
  };
  const { visitScheduleId } = req.params;

  const nonNullOrUndefinedToUpdate = pickByNotNullOrUndefined(newValues);

  // Check if visit Schedule exists
  const visitSchedule = await res.app.locals.orm.visitSchedule.findOne({
    where: { id: visitScheduleId },
  });
  if (!visitSchedule) {
    return res.status(400).send({ error: 'model-error', message: 'Visit Schedule not found' });
  }

  const updatedVisitSchedule = await visitSchedule.update(nonNullOrUndefinedToUpdate);

  const response = {
    data: { visitSchedule: updatedVisitSchedule },
  };
  return res.status(200).send(response);
};

//=
// Delete
//=
const deleteVisit = async (req, res) => {
  const { visitId } = req.params;

  // Check if visit exists
  const visit = await res.app.locals.orm.visit.findOne({
    where: { id: visitId },
  });
  if (!visit) {
    return res.status(400).send({ error: 'model-error', message: 'Visit not found' });
  }

  // If the promise does not fail, the visit is deleted
  await visit.destroy();

  const response = {
    data: {
      message: 'Visit  deleted successfully ',
    },
  };

  return res.status(200).send(response);
};

export { scheduleVisit, getVisits, editScheduleVisit, deleteVisit };
