export interface ICheckVar {
  variable: any;
  label: string;
  type: 'string' | 'number' | 'boolean';
  isOptional?: boolean;
}

export interface ICheckExists {
  label: string;
  variable: any;
}
[];
