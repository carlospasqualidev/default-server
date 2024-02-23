import { verify } from 'jsonwebtoken';
import { ErrorMessage } from '../error/ErrorMessage';

export function decodeTokenService({ token }: { token: string }) {
  try {
    return verify(token, process.env.JWT_SECRET!);
  } catch (error) {
    throw new ErrorMessage({
      statusCode: '403 FORBIDDEN',
      message: 'Token de ativação inválido ou já utilizado.',
    });
  }
}
