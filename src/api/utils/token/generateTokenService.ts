import { sign } from 'jsonwebtoken';

export async function generateToken(data: any) {
  const secret: any = process.env.JWT_SECRET;

  return sign(data, secret, { expiresIn: '8h' });
}
