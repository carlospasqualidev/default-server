// #region IMPORTS
import { createTransport } from 'nodemailer';
import { ErrorMessage } from '../error/ErrorMessage';
import { templateExample } from './templates/templateExemple';
import { ITemplateExample } from './templates/types';

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

export const sendTemplateExemple = async ({
  subject,
  toEmail,
  attachments,
  field1,
  field2,
  field3,
}: ITemplateExample) => {
  const mail = {
    from: `${subject} <${process.env.EMAIL_USERNAME}>`,
    to: toEmail,
    subject: `Ada Software House - ${subject}`,
    attachments,
    html: templateExample({
      toEmail,
      subject,
      field1,
      field2,
      field3,
    }),
  };

  transporter.sendMail(mail).catch(() => {
    throw new ErrorMessage({
      statusCode: 400,
      message: 'Oops! Encontramos um problema ao enviar o e-mail.',
    });
  });
};
