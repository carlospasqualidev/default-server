// A tipagem do express deve ser a mesma do token
declare namespace Express {
  export interface Request {
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
}
