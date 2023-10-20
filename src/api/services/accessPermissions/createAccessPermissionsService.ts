import { prisma, IPrisma } from '../../../../prisma';

export function createAccessPermissionsService(
  data: IPrisma.accessPermissionsUncheckedCreateInput,
) {
  return prisma.accessPermissions.create({ data });
}
