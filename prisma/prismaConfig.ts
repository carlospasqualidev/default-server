import { PrismaClient } from '@prisma/client';

export { Prisma as IPrisma } from '@prisma/client';
export { $Enums as enums } from '@prisma/client';
export const prisma = new PrismaClient();
