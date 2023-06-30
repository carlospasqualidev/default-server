import { Prisma, prisma } from '../../../../prisma';

interface IFindUsersService {
  AND?: Prisma.Enumerable<Prisma.usersWhereInput> | undefined;
  NOT?: Prisma.Enumerable<Prisma.usersWhereInput> | undefined;
  OR?: Prisma.Enumerable<Prisma.usersWhereInput> | undefined;
  id?: string | Prisma.StringFilter | undefined;
  name?: string | Prisma.StringFilter | undefined;
  email?: string | Prisma.StringFilter | undefined;
  isBlocked?: boolean | Prisma.BoolFilter | undefined;
  lastAccess?: string | Date | Prisma.DateTimeNullableFilter | null | undefined;
  permissions?: Prisma.UsersPermissionsListRelationFilter | undefined;

  options?:
    | {
        skip?: number | undefined;
        take?: number | undefined;
        orderBy?: Prisma.Enumerable<Prisma.usersOrderByWithRelationInput> | undefined;
      }
    | undefined;
  data: Prisma.usersSelect;
}

/**
 *@example await findUsersService({
                                    id: '1b963be4-3da1-4171-9dbc-b03f433adcd3', // parametros de busca

                                    data: { // dados de retorno
                                      id: true,
                                      email: true,
                                    },
                                  });
 */
export async function findUsersService(args: IFindUsersService) {
  const users = await prisma.users.findMany({
    select: args.data,
    orderBy: args.options?.orderBy,
    skip: args.options?.skip,
    take: args.options?.take,

    where: {
      AND: args.AND,
      NOT: args.NOT,
      OR: args.OR,
      id: args.id,
      name: args.name,
      email: args.email,
      isBlocked: args.isBlocked,
      lastAccess: args.lastAccess,
      permissions: args.permissions,
    },
  });

  return users;
}
