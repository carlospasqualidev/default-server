import { verify } from 'jsonwebtoken';
import { ErrorMessage } from '../error/ErrorMessage';
import { ITokenService } from './types';

export const decodeToken = ({ token }: ITokenService) => {
  try {
    return verify(token, process.env.JWT_SECRET!);
  } catch (error) {
    throw new ErrorMessage({
      statusCode: 400,
      message: 'Token de ativação inválido ou já utilizado.',
    });
  }
};
