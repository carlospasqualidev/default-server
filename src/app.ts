import os from 'os';
import cluster from 'cluster';

const runPrimaryProcess = () => {
  const processesCount = os.cpus().length * 2;

  for (let index = 0; index < processesCount; index++) cluster.fork();

  cluster.on('exit', (worker, code) => {
    if (code !== 0 && !worker.exitedAfterDisconnect) {
      cluster.fork();
    }
  });

  // eslint-disable-next-line no-console
  console.log(`\n\n\n 🚀️ Server is running with ${processesCount} processes 🚀️ \n`);
};

const runWorkerProcess = async () => {
  await import('./server');
};

cluster.isPrimary ? runPrimaryProcess() : runWorkerProcess();
