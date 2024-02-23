import { ErrorMessage } from '../error';
import { ICheckSpecialCharacter } from './types';

export const checkSpecialCharacter = (Vars: ICheckSpecialCharacter[]) => {
  for (let i = 0; i < Vars.length; i++) {
    if (Vars[i].value.includes(Vars[i].character)) {
      throw new ErrorMessage({
        statusCode: '422 UNPROCESSABLE CONTENT',
        message: `A informação: ${Vars[i].label} não pode conter o caractere [ ${Vars[i].character} ].`,
      });
    }
  }
};
