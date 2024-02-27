import { enums } from '../../../../prisma';

interface IPermissions {
  permission: enums.permissions;
  label: string;
}

export async function findManyPermissionService() {
  const permissions: IPermissions[] = [
    {
      permission: 'userCreate',
      label: 'Criar usuário',
    },
    {
      permission: 'userRead',
      label: 'Visualizar usuário',
    },
    {
      permission: 'userUpdate',
      label: 'Atualizar usuário',
    },
    {
      permission: 'userDelete',
      label: 'Deletar usuário',
    },
  ];

  return permissions;
}
