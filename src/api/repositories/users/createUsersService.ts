import { Prisma, prisma } from '../../../../prisma';

/**
 *@example await createUserService([
                                    {
                                      name: 'Carlos Pasquali',
                                      password: '123456',
                                      email: 'carlos.pasquali.dev@gmail.com',
                                      customUrl: 'https://github.com/carlospasqualidev'
                                    }
                                  ]);
 */
export async function createUsersService(data: Prisma.usersUncheckedCreateInput[]) {
  return prisma.$transaction(
    data.map((user) =>
      prisma.users.create({
        data: user,
      }),
    ),
  );
}
