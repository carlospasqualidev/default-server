/* eslint-disable valid-typeof */
import { ErrorMessage } from '../messages/ErrorMessage';
import { ICheckExists } from './types';

export const checkExists = (Vars: ICheckExists[]) => {
  for (let i = 0; i < Vars.length; i++) {
    if (Vars[i].variable === null || Vars[i].variable === undefined) {
      throw new ErrorMessage({
        statusCode: 400,
        message: `A informação: ${Vars[i].label} não existe na base de dados.`,
      });
    }
  }
};
