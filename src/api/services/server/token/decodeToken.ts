import { verify } from 'jsonwebtoken';
import { ErrorMessage } from '../messages/ErrorMessage';
import { ITokenService } from './types';

export function decodeToken({ token }: ITokenService) {
  try {
    const decodedToken = verify(token, process.env.JWT_SECRET!);
    return decodedToken;
  } catch (error) {
    throw new ErrorMessage({
      statusCode: 400,
      message: 'Token de ativação inválido ou já utilizado.',
    });
  }
}
