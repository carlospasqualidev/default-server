export interface IToken {
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
