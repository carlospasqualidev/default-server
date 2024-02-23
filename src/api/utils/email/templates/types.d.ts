export interface ISendTemplate {
  toEmail: string;
  attachments?: {
    filename: string;
    path: string;
  }[];
}

export interface ISendConfirmationToRegister extends ISendTemplate {
  token: string;
}

export interface ISendRecoveryPassword extends ISendTemplate {
  token: string;
}
