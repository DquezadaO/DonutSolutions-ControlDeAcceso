/* eslint-disable no-console */
import app from './src/app';
import db from './src/models/index.cjs';

const port = process.env.APP_PORT || 3000;

db.sequelize
  .authenticate()
  .then(() => {
    console.log('🚀 Connection to the database has been established successfully.');

    app.listen(port, () => {
      console.log(`🚀 App running on http://localhost:${port}`);
    });
  })
  .catch((err) => console.error('Unable to connect to the database:', err));
