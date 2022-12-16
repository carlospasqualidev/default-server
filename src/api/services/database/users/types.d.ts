export interface ICreateUser {
  name: string;
  email: string;
  image: string | null;
  password: string;
  customUrl: string;
  Permissions?: {
    create: {
      permissionId: string;
      Settings: {
        create: {
          create: boolean;
          edit: boolean;
          view: boolean;
          delete: boolean;
        };
      };
    };
  };
}

export interface IFindUserByEmail {
  email: string;
}
