// A tipagem do token deve ser a mesma do express

export interface IToken {
  user: {
    id: string;
  };
}
