// #region IMPORTS
// LIBS
import { Request, Response } from 'express';
import { compare } from 'bcrypt';

// SERVICES
import { findUserByEmail } from '../../services/database/users';
import { checkVar } from '../../services/server/validator';
import { ErrorMessage } from '../../services/server/messages';
import { generateToken } from '../../services/server/token';
import { checkPermission } from '../../services/database/permissions';

// #endregion

export const LoginController = async (req: Request, res: Response) => {
  /* #region SWAGGER
      #swagger.tags = ['Authentication']
      #swagger.description = 'Endpoint para logar o usuário.'
      #swagger.security = [bearerAuth:[]]
      #swagger.parameters['obj'] = {
                in: 'body',
                description: 'Informações para efetuar login.',
                required: true,
                schema: {
                    email: "admin@ada.com",
                    password: "123123123",
                }
            }

        #swagger.responses[200] = {
            schema:{
                User:{
                  id: "",
                  name:"",
                  email:"",
                  image:"",
                  lastAccess:"",
                  Permissions:[
                    {
                      Permission:{
                        id:"",
                        name:""
                      },
                      create:true,
                      edit:true,
                      view:true,
                      delete:true
                    }
                  ]
                }

            },
            description: 'Usuário encontrado.'
    } */
  // #endregion

  const { email, password } = req.body;

  checkVar([
    { label: 'E-mail', type: 'string', variable: email },
    {
      label: 'Senha',
      type: 'string',
      variable: password,
    },
  ]);

  const User = await findUserByEmail({ email });

  checkPermission({
    permission: 'admin',
    Permissions: User.Permissions,
  });

  const checkPassword = await compare(password, User.password);

  if (!checkPassword) {
    throw new ErrorMessage({
      statusCode: 400,
      message: 'E-mail ou senha incorretos.',
    });
  }

  if (User.isBlocked) {
    throw new ErrorMessage({
      statusCode: 400,
      message:
        'Sua conta está bloqueada, entre em contato com a administração.',
    });
  }

  const token = generateToken({
    data: {
      userId: User.id,
      Permissions: User.Permissions,
    },
  });

  return res.status(200).json({
    token,
    User: {
      id: User.id,
      name: User.name,
      email: User.email,
      image: User.image,
      lastAccess: User.lastAccess,
      customUrl: User.customUrl,
      Permissions: User.Permissions,
    },
  });
};
