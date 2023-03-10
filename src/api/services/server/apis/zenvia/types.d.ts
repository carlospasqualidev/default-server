export interface IPostWhatsappConfirmation {
  receiverPhoneNumber: string;
  link: string;
}

export interface IPostWhatsappSendMaintenanceNotificationService {
  receiverPhoneNumber: string;
  receiverName: string;
  maintenancesCount: number;
  buildingName: string;
  companyName: string;
  link: string;
}
