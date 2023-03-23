/* eslint-disable camelcase */
import { ErrorMessage } from '../../error';
import { ApiZenvia } from './apiZenvia';
import { IPostWhatsappSendMaintenanceNotificationService } from './types';

export const postWhatsappSendMaintenanceNotificationService = async ({
  receiverPhoneNumber,
  receiverName,
  companyName,
  buildingName,
  maintenancesCount,
  link,
}: IPostWhatsappSendMaintenanceNotificationService) => {
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
              nome_responsavell: receiverName,
              qtd_manutencoes: maintenancesCount,
              obra: buildingName,
              link,
              nome_empresa: companyName,
            },
          },
        ],
      },
      { headers: { 'Accept-Encoding': 'gzip,deflate,compress' } },
    );
  } catch (error) {
    throw new ErrorMessage({
      statusCode: 400,
      message: 'Oops! Encontramos um problema ao enviar a notificação.',
    });
  }
};
