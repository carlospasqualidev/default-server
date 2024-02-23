import axios from 'axios';

interface ISendErrorsToLogServer {
  stack: any;
  extraInfo?: any;
}

const enviroments = ['Sandbox', 'Production'];

export async function sendErrorsToLogServer({ stack, extraInfo }: ISendErrorsToLogServer) {
  if (process.env.LOG_SERVER_URL && enviroments.includes(process.env.ENVIRONMENT!)) {
    axios.post(process.env.LOG_SERVER_URL!, {
      projectName: process.env.PROJECT_NAME,
      environment: process.env.ENVIRONMENT,
      side: 'Server',
      errorStack: stack,
      extraInfo,
    });
  }
}
