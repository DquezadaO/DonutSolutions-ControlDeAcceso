import cors from 'cors';
import express from 'express';

import configEnv from './config/env';
import validateToken from './middlewares/validateToken';
import validationError from './middlewares/validationError';
import db from './models/index.cjs';
import backofficeRoutes from './routes/backoffice/backoffice.routes';
import guardRoutes from './routes/guard/guard.routes';
import publicRoutes from './routes/public/public';
import residentRoutes from './routes/resident/resident';
import sharedRoutes from './routes/shared/shared';

const app = express();

app.locals.orm = db;
app.locals.env = configEnv;

app.use(cors());
app.use(express.json());

app.use('/public', publicRoutes); // Without middleware

app.use(validateToken);

app.use(validationError);

app.use('/backoffice', backofficeRoutes);
app.use('/guard', guardRoutes);

app.use('/resident', residentRoutes);

app.use('/shared', sharedRoutes);

export default app;
