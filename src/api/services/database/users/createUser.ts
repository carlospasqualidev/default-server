import { Prisma } from '../../../../../prisma';
import { ICreateUser } from './types';

export const createUser = async ({ data }: { data: ICreateUser }) =>
  Prisma.user.create({
    data,
  });
