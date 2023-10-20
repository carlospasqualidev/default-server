import { prisma, IPrisma } from '../../../../prisma';

// #region Interfaces
interface IFindGendersService {
  where?: IPrisma.gendersWhereInput | undefined;
}
// endregion

export async function findGendersService({ where }: IFindGendersService) {
  return prisma.genders.findFirst({
    select: {
      id: true,
      label: true,
      name: true,
    },
    where,
  });
}
