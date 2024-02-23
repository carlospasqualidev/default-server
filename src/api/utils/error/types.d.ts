type TStatusCode =
  | '200 OK'
  | '201 CREATED'
  | '400 BAD REQUEST'
  | '401 UNAUTHORIZED'
  | '403 FORBIDDEN'
  | '404 NOT FOUND'
  | '422 UNPROCESSABLE CONTENT'
  | '500 INTERNAL SERVER ERROR';

export interface IErrorMessage {
  statusCode: TStatusCode;
  message: string;
}
