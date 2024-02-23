import { ErrorMessage } from '../error';
import { IcheckIfNaN } from './types';

export function checkIfNaN(NumberList: IcheckIfNaN[]) {
  for (const { number, label } of NumberList) {
    if (number && Number.isNaN(Number(number))) {
      throw new ErrorMessage({
        statusCode: '422 UNPROCESSABLE CONTENT',
        message: `A informação ${label} foi enviada de maneira incorreta.`,
      });
    }
  }
}
