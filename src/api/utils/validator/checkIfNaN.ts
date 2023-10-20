import { ErrorMessage } from '../error';

export function checkIfNaN(NumberList: { number: any; label: string }[]) {
  for (const { number, label } of NumberList) {
    if (number && Number.isNaN(Number(number))) {
      throw new ErrorMessage({
        statusCode: '404 NOT FOUND',
        message: `A informação ${label} foi enviada de maneira incorreta.`,
      });
    }
  }
}
