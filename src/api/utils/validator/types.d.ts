type IType =
  | 'string'
  | 'int'
  | 'float'
  | 'boolean'
  | 'date'
  | 'json'
  | 'array'
  | 'time'
  | 'email'
  | 'CEP'
  | 'CPF'
  | 'CNPJ';

export interface ICheckValues {
  value: any;
  label: string;
  type: IType;
  required?: boolean;
  allowZero?: boolean;
}

export interface INeedAndCannotExist {
  label: string;
  value: any;
}

export interface ICheckPassword {
  password: string;
  confirmPassword: string;
}

export interface ICheckSpecialCharacter {
  label: string;
  value: string;
  character: string;
}

export interface IcheckIfNaN {
  number: any;
  label: string;
}

export interface ICheckEnums {
  enums: { [key: string]: string };
  value: string;
  label: string;
}

export interface ICheckDateRanges {
  startDate: string | undefined;
  endDate: string | undefined;
  label: string;
  allowEquals?: boolean;
}
