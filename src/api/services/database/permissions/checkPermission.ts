import { ErrorMessage } from '../../server/error';
import { ICheckPermission } from './types';

export const checkPermission = ({
  Permissions,
  permission,
  checkCRUD,
}: ICheckPermission) => {
  for (let i = 0; i < Permissions.length; i++) {
    if (Permissions[i].Permission.name === permission) {
      if (!checkCRUD) return;

      if (checkCRUD.create && Permissions[i].create === false) {
        throw new ErrorMessage({
          statusCode: 400,
          message: 'Você não possui permissão de criação.',
        });
      }

      if (checkCRUD.edit && Permissions[i].edit === false) {
        throw new ErrorMessage({
          statusCode: 400,
          message: 'Você não possui permissão de edição.',
        });
      }

      if (checkCRUD.view && Permissions[i].view === false) {
        throw new ErrorMessage({
          statusCode: 400,
          message: 'Você não possui permissão de visualização.',
        });
      }

      if (checkCRUD.delete && Permissions[i].delete === false) {
        throw new ErrorMessage({
          statusCode: 400,
          message: 'Você não possui permissão de exclusão.',
        });
      }
    } else {
      throw new ErrorMessage({
        statusCode: 400,
        message: 'Você não possui permissão de acesso.',
      });
    }
  }
};
