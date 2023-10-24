import { NextFunction, Request, Response } from 'express';
import { findUsersService } from '../../../../services/users';
import { checkPermissionService } from '../../services';
import { checkValues } from '../../../validator';

interface IPermissions {
  name: string;
  sublevels: {
    name: string;
  }[];
}

export async function checkOwnerCompany(req: Request, _res: Response, next: NextFunction) {
  const { user } = req;
  const { companyId } = req.params;

  // #region VALIDATIONS
  checkValues([
    {
      label: 'Empresa',
      value: companyId,
      type: 'string',
    },
    {
      label: 'Usuário',
      value: user.id,
      type: 'string',
    },
  ]);

  const userData = await findUsersService({
    where: {
      id: user.id,
      person: {
        companies: {
          some: {
            companyId,
          },
        },
      },
    },
  });

  const permissions: IPermissions[] = [];
  userData.person?.companies.forEach((company) => {
    company.personCompanyPermissions.forEach((permissionBase) => {
      const permissionIndex = permissions.findIndex(
        ({ name }) => permissionBase.permissionSublevels.permissions.name === name,
      );

      if (permissionIndex !== -1) {
        permissions[permissionIndex].sublevels.push({
          name: permissionBase.permissionSublevels.name,
        });
      } else {
        permissions.push({
          name: permissionBase.permissionSublevels.permissions.name,
          sublevels: [{ name: permissionBase.permissionSublevels.name }],
        });
      }
    });
  });

  // #endregion

  checkPermissionService({
    toCheck: {
      name: 'owner',
      sublevels: ['update', 'delete'],
    },
    permissions,
  });

  next();
}
