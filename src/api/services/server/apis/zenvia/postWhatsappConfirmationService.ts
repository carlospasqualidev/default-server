import { ErrorMessage } from '../../error';
import { ApiZenvia } from './apiZenvia';
import { IPostWhatsappConfirmation } from './types';

export const postWhatsappConfirmationService = async ({
  receiverPhoneNumber,
  link,
}: IPostWhatsappConfirmation) => {
  try {
    await ApiZenvia.post(
      '/v2/channels/whatsapp/messages',
      {
        // changehere
        from: '000',
        to: `55${receiverPhoneNumber}`,
        contents: [
          {
            type: 'template',
            templateId: 'templateId',
            fields: {
              link,
            },
          },
        ],
      },
      { headers: { 'Accept-Encoding': 'gzip,deflate,compress' } },
    );
  } catch (error) {
    throw new ErrorMessage({
      statusCode: 400,
      message: 'Oops! Encontramos um problema ao enviar a confirmação de WhatsApp.',
    });
  }
};
