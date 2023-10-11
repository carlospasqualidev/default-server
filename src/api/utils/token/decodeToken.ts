import { verify } from 'jsonwebtoken';
import { ErrorMessage } from '../error/ErrorMessage';
import 'dotenv/config';

export function decodeToken(token: string) {
  try {
    return verify(token, process.env.JWT_SECRET!);
  } catch (error) {
    throw new ErrorMessage({
      statusCode: '400 BAD REQUEST',
      message: 'Token de ativação inválido ou já utilizado.',
    });
  }
}
