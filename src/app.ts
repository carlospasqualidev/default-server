// /* eslint-disable no-console */
// import os from 'os';
// import cluster from 'cluster';

// const runPrimaryProcess = () => {
//   const processesCount = os.cpus().length * 2;

//   for (let index = 0; index < processesCount; index++) cluster.fork();

//   cluster.on('exit', (worker, code) => {
//     if (code !== 0 && !worker.exitedAfterDisconnect) {
//       cluster.fork();
//     }
//   });

//   console.log(`\n\n\n 🚀️ Server is running with ${processesCount} processes 🚀️ \n`);
// };

// const runWorkerProcess = async () => {
//   await import('./server');
// };

// cluster.isPrimary ? runPrimaryProcess() : runWorkerProcess();

/* eslint-disable no-console */
import { server } from './server/server';

server.listen(process.env.PORT || 8080, () =>
  console.log(`\n\n🚀 Server is running on port ${process.env.PORT || 8080} 🚀\n\n`),
);
