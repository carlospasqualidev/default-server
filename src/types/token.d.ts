// A tipagem do token deve ser a mesma do express

export interface IPermissions {
  id: string;
  name: string;

  subPermissions: {
    id: string;
    name: string;
  }[];
}

export interface IToken {
  user: {
    id: string;
    permissions: IPermissions[];
  };
}
