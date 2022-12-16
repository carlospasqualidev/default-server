declare namespace Express {
  // a tipagem do express deve ser a mesma do token
  export interface Request {
    userId: string;
    Permissions: [
      {
        Permission: {
          name: string;
        };
        create: boolean;
        edit: boolean;
        view: boolean;
        delete: boolean;
      },
    ];
  }
}
