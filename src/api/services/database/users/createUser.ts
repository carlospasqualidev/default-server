import { Prisma } from '../../../../../prisma';
import { ICreateUser } from './types';

export async function createUser({ data }: { data: ICreateUser }) {
  return Prisma.user.create({
    data,
  });
}
