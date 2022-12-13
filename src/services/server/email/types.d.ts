export interface ISendEmail {
  toEmail: string;
  subject: string;
  text: string;
  link: string;
  template: 'confirmEmail';
}
export interface IVariables {
  link: string;
  subject: string;
  text: string;
}

export interface IHandlerTemplate {
  template: 'confirmEmail';
  variables: IVariables;
}
