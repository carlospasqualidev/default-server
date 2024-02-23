// #region IMPORTS
import { createTransport } from 'nodemailer';
import { ErrorMessage } from '../error';
import { sendErrorsToLogServer } from '../error/sendErrorsToLogServer';
import { ISendConfirmationToRegister, ISendRecoveryPassword } from './templates/types';
import { templateConfirmationToRegister, templateRecoveryPassword } from './templates';

// #endregion

// #region CONFIG
const transporter = createTransport({
  host: 'smtp.mail.us-west-2.awsapps.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD,
  },
  tls: { rejectUnauthorized: false },
});
// #endregion

export async function sendEmailConfirmationToRegisterTransporter({
  toEmail,
  token,
  attachments,
}: ISendConfirmationToRegister) {
  const mail = {
    from: `Confirmação de E-mail <${process.env.NODEMAILER_EMAIL}>`,
    to: toEmail,
    subject: `default server - Confirmação de E-mail`,
    attachments,
    html: templateConfirmationToRegister({ token }),
  };

  await transporter.sendMail(mail).catch((error) => {
    sendErrorsToLogServer(error);
    throw new ErrorMessage({
      statusCode: '400 BAD REQUEST',
      message: 'Oops! Encontramos um problema ao enviar o email.',
    });
  });
}

export async function sendEmailToRecoveryPasswordTransporter({
  toEmail,
  token,
  attachments,
}: ISendRecoveryPassword) {
  const mail = {
    from: `Recuperação de senha <${process.env.NODEMAILER_EMAIL}>`,
    to: toEmail,
    subject: `default server - Recuperação de senha`,
    attachments,
    html: templateRecoveryPassword({ token }),
  };

  await transporter.sendMail(mail).catch((error) => {
    sendErrorsToLogServer(error);
    throw new ErrorMessage({
      statusCode: '400 BAD REQUEST',
      message: 'Oops! Encontramos um problema ao enviar o email.',
    });
  });
}
