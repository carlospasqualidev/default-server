import { ErrorMessage } from '../error';
import { ICheckPassword } from './types';

export async function checkPassword({ password, confirmPassword }: ICheckPassword) {
  if (password !== confirmPassword) {
    throw new ErrorMessage({
      message: 'As senhas precisam ser iguais',
      statusCode: '422 UNPROCESSABLE CONTENT',
    });
  }

  if (password.length < 8) {
    throw new ErrorMessage({
      message: 'A senha precisa ter pelo menos 8 dígitos',
      statusCode: '422 UNPROCESSABLE CONTENT',
    });
  }
}
