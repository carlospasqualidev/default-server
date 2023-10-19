import { ErrorMessage } from '../error/ErrorMessage';

interface ICheckExistsAndNot {
  label: string;
  value: any;
}

export const checkNotExists = (Vars: ICheckExistsAndNot[]) => {
  for (let i = 0; i < Vars.length; i++) {
    if (Vars[i].value !== null || Vars[i].value !== undefined) {
      throw new ErrorMessage({
        statusCode: '400 BAD REQUEST',
        message: `A informação: ${Vars[i].label} já existe na base de dados.`,
      });
    }
  }
};
