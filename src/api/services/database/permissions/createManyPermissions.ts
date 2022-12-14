import { Prisma } from '../../../../../prisma';
import { ICreateManyPermissions } from './types';

export async function createManyPermissions({ data }: ICreateManyPermissions) {
  return Prisma.permission.createMany({ data });
}
