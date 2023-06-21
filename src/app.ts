/* eslint-disable no-console */
import 'dotenv/config';
import { server } from './config/server';

server.listen(process.env.PORT || 8080, () =>
  console.log('\n\n\n 🚀️ Server is running 🚀️ \n\n', `📰️ http://localhost:8080/api/docs\n\n`),
);
