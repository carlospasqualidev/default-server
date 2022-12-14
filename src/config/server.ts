// #region IMPORTS
import swaggerUi from 'swagger-ui-express';

import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { corsOptions } from './corsOptions';
import 'express-async-errors';
import { errorHandler } from '../api/services/server/messages';
import { ServerRouter } from '../api/routes';

import swaggerFile from '../docs/swaggerDocs.json';

// endregion

export const Server = express();

Server.use(cors(corsOptions));
Server.use(express.json());

Server.use('/api', ServerRouter);
Server.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

Server.use(helmet());
Server.use(errorHandler);
