import bcrypt from 'bcrypt';

//=
// Post
//=
import { pickByNotNullOrUndefined } from '../../helpers/utils';

const editUser = async (req, res) => {
  try {
    const { oldEmail } = req.body;
    delete req.body.old_email;
    const nonNullOrUndefinedToUpdate = pickByNotNullOrUndefined(req.body);

    const user = await res.app.locals.orm.user.findOne({
      where: { email: oldEmail },
      attributes: ['id'],
    });

    if (!oldEmail || !user) {
      const errObj = { error: 'service-error', message: 'User with given email does not exist.' };
      throw errObj;
    }

    const updatedUser = await user.update(nonNullOrUndefinedToUpdate);

    const response = {
      data: { user: updatedUser },
    };
    return res.status(200).send(response);
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
};

const newUser = async (req, res) => {
  try {
    const userRole = res.locals.role;

    // Check valid role
    if (userRole !== 'backoffice') {
      return res.status(400).send({ error: 'model-error', message: 'User is not backoffice' });
    }

    const {
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
      password,
      role,
      id_unit: unitId,
    } = req.body;

    // Check if user exists
    const user = await res.app.locals.orm.user.findOne({
      where: { email },
      attributes: ['id'],
    });
    if (user) {
      return res.status(400).send({ error: 'model-error', message: 'User already exists' });
    }

    // If id_unit send, check if exists
    const unit = await res.app.locals.orm.unit.findOne({
      where: { id: unitId },
      attributes: ['id'],
    });
    if (!unit) {
      return res.status(400).send({ error: 'model-error', message: 'Unit dont exists' });
    }
    // If User role is 'guardia', check unitId == 1
    if (role === 'guardia' && unitId !== 1) {
      return res
        .status(400)
        .send({ error: 'model-error', message: 'Guard cant have a resident Unit assigned' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user record
    const newUser = {
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
      role,
      unitId,
    };
    const saved = await res.app.locals.orm.user.create(newUser);

    if (!saved) {
      return res.status(400).send({ error: 'model-error', message: 'Error creating new User' });
    }

    console.error(saved);

    const response = {
      data: {
        id_user: saved.id,
      },
    };
    return res.status(200).send(response);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: 'service-error', message: err });
  }
};

const deleteUser = async (req, res) => {
  try {
    const role = res.locals.role;

    // Check valid role
    if (role !== 'backoffice') {
      return res.status(400).send({ error: 'model-error', message: 'User is not backoffice' });
    }

    const { id_user: userId } = req.body;

    // Check if user exists
    const user = await res.app.locals.orm.user.findOne({
      where: { id: userId },
      attributes: ['id'],
    });

    if (!user) {
      return res.status(400).send({ error: 'model-error', message: 'User dont exists' });
    }

    // If the promise does not fail, the user is deleted
    await user.destroy();

    const response = {
      data: {
        message: 'User deleted successfully ',
      },
    };

    return res.status(200).send(response);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: 'service-error', message: err });
  }
};

const registerCar = async (req, res) => {
  try {
    const role = res.locals.role;

    // Check valid role
    if (role !== 'backoffice') {
      return res.status(400).send({ error: 'model-error', message: 'User is not backoffice' });
    }

    const {
      id_unit: unitId,
      license_plate: licensePlate,
      car_brand: carBrand,
      car_model: carModel,
      car_color: carColor,
    } = req.body;

    // Check if unit exists
    const unit = await res.app.locals.orm.unit.findOne({
      where: { id: unitId },
      attributes: ['id'],
    });
    if (!unit) {
      return res.status(400).send({ error: 'model-error', message: 'Unit doesnt exists' });
    }

    // If id_unit send, check if exists
    const car = await res.app.locals.orm.car.findOne({
      where: {
        licensePlate,
      },
      attributes: ['id'],
    });
    if (car) {
      return res.status(400).send({ error: 'model-error', message: 'Car already exists' });
    }
    // Check if Unit is not the one assigned to the guard
    if (unitId === 1) {
      return res
        .status(400)
        .send({ error: 'model-error', message: 'Guard cant have a car registered' });
    }

    // Create car record
    const newCar = {
      unitId,
      licensePlate,
      carBrand,
      carModel,
      carColor,
    };
    const saved = await res.app.locals.orm.car.create(newCar);

    if (!saved) {
      return res.status(400).send({ error: 'model-error', message: 'Error creating new Car' });
    }

    console.error(saved);

    const response = {
      data: {
        id_car: saved.id,
      },
    };
    return res.status(200).send(response);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: 'service-error', message: err });
  }
};

const addProvider = async (req, res) => {
  try {
    const role = res.locals.role;
    const userId = res.locals.userId;

    // Check valid role
    if (role !== 'backoffice') {
      return res.status(400).send({ error: 'model-error', message: 'User is not backoffice' });
    }

    const {
      first_name: firstName,
      last_name: lastName,
      run,
      phone,
      license_plate: licensePlate,
    } = req.body;

    // Check if provider exists
    const provider = await res.app.locals.orm.provider.findOne({
      where: { run },
      attributes: ['id'],
    });

    if (provider) {
      return res.status(400).send({ error: 'model-error', message: 'Provider already exists' });
    }

    // Create provider record
    const newProvider = {
      firstName,
      lastName,
      run,
      phone,
      licensePlate,
      backofficeId: userId,
      condominiumId: 1,
    };
    const saved = await res.app.locals.orm.provider.create(newProvider);

    if (!saved) {
      return res.status(400).send({ error: 'model-error', message: 'Error creating new Provider' });
    }

    console.error(saved);

    const response = {
      data: {
        id_provider: saved.id,
      },
    };

    return res.status(200).send(response);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: 'service-error', message: err });
  }
};

//=
// GET
//=

const getCondominiumCars = async (req, res) => {
  try {
    const role = res.locals.role;

    // Check valid role
    if (role !== 'backoffice') {
      return res.status(400).send({ error: 'model-error', message: 'User is not backoffice' });
    }

    // Get user instance

    const user = await res.locals.getUser(['id', 'unitId']);

    const unit = await res.app.locals.orm.unit.findOne({
      where: { id: user.unitId },
    });
    if (!unit) {
      return res.status(400).send({ error: 'model-error', message: 'Unit doesnt exists' });
    }

    const { condominiumId } = unit;

    const units = await res.app.locals.orm.unit.findAll({
      where: { condominiumId },
    });

    const unitIds = units.map((u) => u.id);

    // Get cars from a condominium
    const cars = await res.app.locals.orm.car.findAll({
      where: {
        unitId: unitIds,
      },
    });

    const response = {
      data: cars,
    };

    return res.status(200).send(response);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: 'service-error', message: err });
  }
};

const getProviders = async (req, res) => {
  try {
    const role = res.locals.role;

    // Check valid role
    if (role !== 'backoffice') {
      return res.status(400).send({ error: 'model-error', message: 'User is not backoffice' });
    }

    const providers = await res.app.locals.orm.provider.findAll({
      where: { condominiumId: 1 },
    });

    const response = {
      data: providers,
    };

    return res.status(200).send(response);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: 'service-error', message: err });
  }
};

export {
  newUser,
  editUser,
  deleteUser,
  getCondominiumCars,
  registerCar,
  addProvider,
  getProviders,
};
