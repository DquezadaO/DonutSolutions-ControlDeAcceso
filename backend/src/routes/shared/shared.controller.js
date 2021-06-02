//=
// GET
//=

const getUsers = async (req, res) => {
  try {
    const userId = res.locals.userId;
    const role = res.locals.role;

    if (!(role === 'backoffice' || role === 'guardia')) {
      return res.status(400).send({ error: 'model-error', message: 'Role not allowed' });
    }

    // Get user
    const user = await res.app.locals.orm.user.findOne({
      where: { id: userId, role: role },
    });
    if (!user) {
      return res.status(400).send({ error: 'model-error', message: 'User not found' });
    }

    const userUnitId = user.unitId;
    // Get unit object
    const unit = await res.app.locals.orm.unit.findOne({
      where: { id: userUnitId },
    });
    // Get users based on user
    const condominiumId = unit.condominiumId;
    const users = await res.app.locals.orm.user.findAll({
      include: [
        {
          association: 'unit',
          where: {
            condominiumId,
          },
          require: false,
        },
      ],
    });

    const response = {
      data: users,
    };
    return res.status(200).send(response);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: 'service-error', message: err });
  }
};

const getUnits = async (req, res) => {
  try {
    const role = res.locals.role;

    if (!(role === 'backoffice' || role === 'guardia')) {
      return res.status(400).send({ error: 'model-error', message: 'Role not allowed' });
    }

    // Get units
    const units = await res.app.locals.orm.unit.findAll({
      where: { condominiumId: 1 },
    });

    const response = {
      data: {
        units,
      },
    };

    return res.status(200).send(response);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: 'service-error', message: err });
  }
};

export { getUsers, getUnits };
