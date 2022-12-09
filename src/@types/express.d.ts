// eslint-disable-next-line no-unused-vars
declare namespace Express {
  export interface Request {
    userId: string;
    Permissions: [
      {
        Permission: {
          name: string;
        };
      },
    ];
    Company: {
      id: string;
      name: string;
      contactNumber: string;
      CNPJ?: string;
      CPF?: string;
      createdAt: Date;
      image: string;
    };

    iat: number;
    exp: number;

    file: any;
    image_link: any;
  }
}
