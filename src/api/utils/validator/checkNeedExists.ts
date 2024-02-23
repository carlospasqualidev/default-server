import { ErrorMessage } from '../error';
import { INeedAndCannotExist } from './types';

export const checkNeedExists = (Vars: INeedAndCannotExist[]) => {
  for (let i = 0; i < Vars.length; i++) {
    if (!Vars[i].value) {
      throw new ErrorMessage({
        statusCode: '404 NOT FOUND',
        message: `A informação: ${Vars[i].label} não existe na base de dados.`,
      });
    }
  }
};
