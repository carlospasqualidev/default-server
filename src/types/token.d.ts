// A tipagem do token deve ser a mesma do express
export interface IToken {
  userId: string;
  permissions: [
    {
      id: string;
      name: string;
      isDeleted: boolean;

      subPermissions: [
        {
          id: string;
          name: string;
          isDeleted: boolean;
        },
      ];
    },
  ];
}
