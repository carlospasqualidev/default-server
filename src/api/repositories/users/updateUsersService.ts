import { Prisma, prisma } from '../../../../prisma';

interface IUpdateUsersService {
  id?: string | undefined;
  email?: string | undefined;
  data: Prisma.usersUncheckedUpdateInput;
}

/**
 *@example await updateUsersService([
                                    {
                                      id: '1b963be4-3da1-4171-9dbc-b03f433adcd3', //parametro de busca

                                      data: { //dados para atualização
                                        name: 'Carlos Pasquali',
                                        password: '123456',
                                        email: 'carlos.pasquali.dev@gmail.com',
                                        customUrl: 'https://github.com/carlospasqualidev'
                                      }
                                    }
                                  ]);
 */
export async function updateUsersService(args: IUpdateUsersService[]) {
  return prisma.$transaction(
    args.map(({ id, email, data }) =>
      prisma.users.update({
        data,
        where: {
          id,
          email,
        },
      }),
    ),
  );
}
