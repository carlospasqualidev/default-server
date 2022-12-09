import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { corsOptions } from './corsOptions';

export const Server = express();

Server.use(express.json());
Server.use(cors(corsOptions));
Server.use(helmet());
