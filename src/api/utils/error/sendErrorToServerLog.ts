import axios from 'axios';
import 'dotenv/config';

interface ISendErrorToServerLog {
  stack: any;
  extraInfo?: any;
}

export async function sendErrorToServerLog({ stack, extraInfo }: ISendErrorToServerLog) {
  if (
    process.env.DATABASE_URL?.includes('sandbox') ||
    process.env.DATABASE_URL?.includes('production')
  ) {
    axios.post('https://ada-logs.herokuapp.com/api/errors/create', {
      projectName: process.env.PROJECT_NAME,
      environment: process.env.DATABASE_URL,
      side: 'Server',
      errorStack: stack,
      extraInfo,
    });
  }
}
