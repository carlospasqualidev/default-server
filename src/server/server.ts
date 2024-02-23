import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import 'express-async-errors';

import { corsConfig } from './corsConfig';
import { errorHandler } from '../api/utils/error';
import { serverRouter } from '../api/router';

export const server = express();

server.use(cors(corsConfig));
server.use(express.json());
server.use(helmet());

server.use('/api', serverRouter);

server.use(errorHandler);
