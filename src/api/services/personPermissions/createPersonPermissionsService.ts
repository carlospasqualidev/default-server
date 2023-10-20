import { prisma, IPrisma } from '../../../../prisma';

export function createPersonPermissionsService(
  data: IPrisma.personPermissionsUncheckedCreateInput,
) {
  return prisma.personPermissions.create({ data });
}
