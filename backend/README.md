# Backend

## How to run project

### Requirements

Install all required dependencies:

- Node.js v12.20.0 or newer <https://nodejs.org/es/download/>
- Yarn <https://classic.yarnpkg.com/en/docs/install>
- Install dependencies with:

```bash
yarn install
```

- Create your `.env` from `.env.example`

### Run development

```bash
$ yarn dev
# or with other port
$ APP_PORT=5000 yarn dev
```

### Run linter

```bash
$ yarn lint
$ yarn lint:fix
```

### Show sequelize-cli commands

```bash
$ yarn sequelize --help
```

### Create associations

- One to One

```js
// Visit
static associate(models) {
  this.hasOne(models.visitSchedule, { onDelete: 'cascade' });
}

// VisitSchedule
static associate(models) {
  this.belongsTo(models.visit);
}
```

- One to Many
```js
// User
static associate(models) {
  this.hasMany(models.visit, { foreignKey: 'residentId' });
}

// Visit
static associate(models) {
  this.belongsTo(models.user, { foreignKey: 'residentId', as: 'resident' });
}
```

- Many to Many

TODO


<https://sequelize.org/master/manual/assocs.html>

### Playground orm

- In root folder run node

```bash
$ node
```

- Import orm

```js
const orm = require('./src/models/index.cjs');
```

- Utils scripts

```js
// See sequelize config and options
orm.sequelize;

// See records in db
orm.user.findAll().then(console.log);
orm.user.findByPk(1).then(console.log);

// See associations //

// one to one
let visit;
orm.visit.findByPk(1).then((x) => (visit = x));
visit.getVisitSchedule().then(console.log);

let schedule;
orm.visitSchedule.findByPk(1).then((x) => (schedule = x));
schedule.getVisit().then(console.log);

// one to many
let resident;
orm.user.findByPk(3).then((x) => (resident = x));
resident.getVisits().then(console.log);

let visit;
orm.visit.findByPk(1).then((x) => (visit = x));
visit.getResident().then(console.log);
```

## Structure

### Routes

The routes are organized in contexts, where each context is a group of endpoint that are related.
For example, the 'user' context would have endpoints for getting and modifying information about the user. This context would have a folder called 'user' with the following files:

- `user.js`: Contains all routes of the context
- `user.validator.js`: Contains the validation logic for route that require parameters
- `user.controller.js`: Contains the business logic for each route

Finally, you should import the routes in the file `app.js`:

```js
import userRoutes from './routes/user/user';

//...
// App code
//...

app.use('/user', userRoutes);
```
