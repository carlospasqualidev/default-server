/* eslint-disable no-console */
import { prisma } from '../prismaConfig';

export async function upsertGenders() {
  const genders = [
    {
      name: 'notInformed',
      label: 'Não informado',
    },
    {
      name: 'male',
      label: 'Masculino',
    },
    {
      name: 'female',
      label: 'Feminino',
    },
  ];

  for (let i = 0; i < genders.length; i++) {
    const gender = genders[i];

    await prisma.genders.upsert({
      create: {
        label: gender.label,
        name: gender.name,
      },
      update: {},
      where: {
        label: gender.label,
        name: gender.name,
      },
    });
  }
}
