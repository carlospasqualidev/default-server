export interface ITemplateExample {
  field1: string;
  field2: string;
  field3: string;
  subject: string;
}

export interface ISendTemplateExample extends ITemplateExample {
  toEmail: string;
  attachments?: {
    filename: string;
    path: string;
  }[];
}
