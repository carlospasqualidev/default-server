import { Prisma } from '../../../../prisma';
import { ICreateUser } from './types';

export async function createUserService({ data }: { data: ICreateUser }) {
  return Prisma.createUser({ data });
}
