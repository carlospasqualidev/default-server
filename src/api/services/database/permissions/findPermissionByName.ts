import { Prisma } from '../../../../../prisma';
import { checkExists } from '../../server/validator';
import { IFindPermissionByName } from './types';

export const findPermissionByName = async ({ name }: IFindPermissionByName) => {
  const permission = await Prisma.permission.findUnique({
    select: {
      id: true,
      name: true,
    },
    where: {
      name,
    },
  });

  checkExists([{ label: 'Permissão', variable: permission }]);

  return permission!;
};
