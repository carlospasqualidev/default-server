export interface ICheckValues {
  value: any;
  label: string;
  type: 'string' | 'int' | 'float' | 'boolean' | 'date' | 'json';
  required?: boolean;
}

export interface ICheckExistsAndNot {
  label: string;
  variable: any;
}
