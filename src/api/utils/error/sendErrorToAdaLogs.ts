import axios from 'axios';

export function sendErrorToAdaLogs(err: any) {
  if (
    process.env.DATABASE_URL?.includes('sandbox') ||
    process.env.DATABASE_URL?.includes('production')
  ) {
    axios.post('https://ada-logs.herokuapp.com/api/errors/create', {
      projectName: 'changehere',
      environment: process.env.DATABASE_URL,
      side: 'Server',
      errorStack: err.stack,
    });
  }
}