// #region IMPORTS
import { createTransport } from 'nodemailer';
import { templateExample } from './templates/templateExample';
import { ISendTemplateExample } from './templates/types';
import { sendErrorToServerLog } from '../error/sendErrorToServerLog';
import 'dotenv/config';
import { ErrorMessage } from '../error';

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
// #endregion

export async function sendTemplateExample({
  subject,
  toEmail,
  attachments,
  field1,
  field2,
  field3,
}: ISendTemplateExample) {
  const mail = {
    from: `${subject} <${process.env.EMAIL_USERNAME}>`,
    to: toEmail,
    subject: `Ada Software House - ${subject}`,
    attachments,
    html: templateExample({
      subject,
      field1,
      field2,
      field3,
    }),
  };

  await transporter.sendMail(mail).catch((error) => {
    sendErrorToServerLog(error);
    throw new ErrorMessage({
      statusCode: '400 BAD REQUEST',
      message: 'Oops! Encontramos um problema ao enviar o email.',
    });
  });
}
