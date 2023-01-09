export const dateFormatter = (date: string | Date) =>
  new Date(date).toLocaleDateString('pt-BR', {
    timeZone: 'UTC',
  });
