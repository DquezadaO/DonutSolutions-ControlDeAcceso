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

export { scheduleVisit, getVisits };
