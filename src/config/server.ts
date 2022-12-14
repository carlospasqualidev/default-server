// #region IMPORTS
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { corsOptions } from './corsOptions';
import 'express-async-errors';
import { errorHandler } from '../services/server/messages';
import { ControllerRouter } from '../controllers/routes';

// endregion

export const Server = express();

Server.use(express.json());
Server.use(cors(corsOptions));
Server.use('/api', ControllerRouter);

Server.use(helmet());
// eslint-disable-next-line @typescript-eslint/no-misused-promises
Server.use(errorHandler);
