// #region IMPORTS
import { createTransport } from 'nodemailer';
import { ErrorMessage } from '../messages/ErrorMessage';

import { handlerTemplate } from './templates';
import { ISendEmail } from './types';

// #endregion

// #region CONFIG
const transporter = createTransport({
  host: 'smtp.mail.us-west-2.awsapps.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: { rejectUnauthorized: false },
});

export async function sendEmail({
  subject,
  toEmail,
  text,
  link,
  template,
}: ISendEmail) {
  const mail = {
    from: `${subject} <${process.env.EMAIL_USERNAME}>`,
    to: toEmail,
    subject: `Easy Alert - ${subject}`,
    text,
    html: handlerTemplate({
      template,
      variables: {
        link,
        text,
        subject,
      },
    }),
  };

  transporter.sendMail(mail).catch(() => {
    throw new ErrorMessage({
      statusCode: 400,
      message: 'Oops! Encontramos um problema ao enviar o e-mail.',
    });
  });
}
