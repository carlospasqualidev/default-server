import cron from 'node-cron';

export function initCron() {
  // -3 horas
  cron.schedule('0 4 * * *', () => console.log('disparando a 1 hora'));
}
