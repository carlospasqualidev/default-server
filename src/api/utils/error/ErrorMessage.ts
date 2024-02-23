/* eslint-disable prefer-destructuring */
import { IErrorMessage } from './types';

/**
 * @example '200 OK': Solicitação bem-sucedida.
 * '201 CREATED': Novo recurso criado com sucesso.
 * '400 BAD REQUEST': Solicitação inválida.
 * '401 UNAUTHORIZED': Acesso não autorizado.
 * '403 FORBIDDEN': Acesso proibido.
 * '404 NOT FOUND': Recurso não encontrado.
 *  422 UNPROCESSABLE CONTENT: Entidade não processável.
 * '500 INTERNAL SERVER ERROR': Erro interno do servidor.
 */
export class ErrorMessage {
  public readonly statusCode: number;

  public readonly message: string;

  public readonly extraInfo?: any;

  constructor({ statusCode, message }: IErrorMessage) {
    this.statusCode = Number(statusCode.split(' ')[0]);
    this.message = message;
    this.extraInfo = null;
  }
}
