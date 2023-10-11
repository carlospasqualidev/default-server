import { ErrorMessage } from '../error/ErrorMessage';
import { ICheckExistsAndNot } from './types';

export const checkNotExists = (Vars: ICheckExistsAndNot[]) => {
  for (let i = 0; i < Vars.length; i++) {
    if (Vars[i].variable !== null || Vars[i].variable !== undefined) {
      throw new ErrorMessage({
        statusCode: '400 BAD REQUEST',
        message: `A informação: ${Vars[i].label} já existe na base de dados.`,
      });
    }
  }
};
