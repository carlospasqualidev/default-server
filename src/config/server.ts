import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import 'express-async-errors';

import { corsOptions } from './corsOptions';
import { errorHandler } from '../api/services/server/error';
import { ServerRouter } from '../api/routes';
import { swaggerLoader, swaggerUI } from './swagger';
import { initCron } from './cron';

export const Server = express();

initCron();

Server.use(cors(corsOptions));
Server.use(express.json());

Server.use('/api', ServerRouter);

Server.use('/api/docs', swaggerUI.serve, (_req: any, res: any) => {
  res.send(swaggerUI.generateHTML(swaggerLoader));
});

Server.use(helmet());
Server.use(errorHandler);
