export interface ITemplateExample {
  toEmail?: string;
  attachments?: {
    filename: string;
    path: string;
  }[];
  subject: string;
  field1: string;
  field2: string;
  field3: string;
}
