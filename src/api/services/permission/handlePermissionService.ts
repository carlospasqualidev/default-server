import { TPermissions } from '../../../types/permissions';
import { ErrorMessage } from '../../utils/error';
import { findManyPermissionByNamesService } from './findManyPermissionByNamesService';

export async function handlePermissionService({ permission }: { permission: TPermissions }) {
  const permissions = {
    admin: await findManyPermissionByNamesService({ names: ['admin', 'collaborator'] }),
    collaborator: await findManyPermissionByNamesService({ names: ['collaborator'] }),
  };

  const permissionToReturn = permissions[permission];

  if (!permissionToReturn) {
    throw new ErrorMessage({
      statusCode: '404 NOT FOUND',
      message: 'Permissão não encontrada.',
    });
  }

  return permissionToReturn;
}
