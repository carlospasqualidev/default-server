import { ErrorMessage } from '../error';
import { ICheckValues, IType } from './types';

const labelToDisplay: { [key in IType]: string } = {
  string: 'Texto',
  int: 'Número inteiro',
  float: 'Número',
  date: 'Data',
  time: 'Hora',
  array: 'Array',
  boolean: 'Booleano',
  json: 'JSON',
  email: 'Email',
  CEP: 'CEP',
  CPF: 'CPF',
  CNPJ: 'CNPJ',
};

function invalidType({ label, type }: { label: string; type: IType }) {
  throw new ErrorMessage({
    statusCode: '400 BAD REQUEST',
    message: `A informação ${label} deve possuir o tipo ${labelToDisplay[type]}.`,
  });
}

function invalidTypeLength({ label, type }: { label: string; type: IType }) {
  throw new ErrorMessage({
    statusCode: '400 BAD REQUEST',
    message: `A informação ${label} ultrapassa o tamanho do tipo ${labelToDisplay[type]}.`,
  });
}

function invalidTime(time: string) {
  const hourFormat = /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/;

  if (hourFormat.test(time)) {
    const hourMinute = time.split(':');
    const hour = Number(hourMinute[0]);
    const minute = Number(hourMinute[1]);

    if (hour >= 0 && hour <= 23 && minute >= 0 && minute <= 59) {
      return true;
    }
  }
  return false;
}

export function checkValues(values: ICheckValues[]) {
  values.forEach(({ label, type, value, required = true, allowZero = false }) => {
    if (required && (value === null || value === undefined || value === '')) {
      throw new ErrorMessage({
        statusCode: '400 BAD REQUEST',
        message: `Verifique o valor da informação ${label} e tente novamente.`,
      });
    }

    if (!allowZero && value === 0) {
      throw new ErrorMessage({
        statusCode: '400 BAD REQUEST',
        message: `A informação ${label} não pode ser zero.`,
      });
    }

    if (!required && (value === null || value === undefined)) return;

    switch (type) {
      case 'string':
        if (typeof value !== 'string') {
          invalidType({ label, type });
        }
        break;

      case 'int':
        if (typeof value !== 'number') {
          invalidType({ label, type });
        }

        if (!Number.isInteger(value)) {
          invalidType({ label, type });
        }

        if (value > 2147483647 || value < -2147483648) {
          invalidTypeLength({ label, type });
        }
        break;

      case 'float':
        if (typeof value !== 'number') {
          invalidType({ label, type });
        }

        if (value > 3.4e38 || value < -3.4e38) {
          invalidTypeLength({ label, type });
        }
        break;

      case 'boolean':
        if (typeof value !== 'boolean') {
          invalidType({ label, type });
        }
        break;

      case 'date':
        if (typeof value === 'number') {
          invalidType({ label, type });
        }

        const checkDate = new Date(value);

        if (checkDate.toString() === 'Invalid Date') {
          invalidType({ label, type });
        }

        if (!(value instanceof Date)) {
          invalidType({ label, type });
        }
        break;

      case 'json':
        try {
          JSON.parse(String(value));
        } catch (error) {
          invalidType({ label, type });
        }
        break;

      case 'array':
        if (!Array.isArray(value)) {
          invalidType({ label, type });
        }

        if (required && !value.length) {
          throw new ErrorMessage({
            statusCode: '400 BAD REQUEST',
            message: `Verifique o valor da informação ${label} e tente novamente.`,
          });
        }
        break;

      case 'time':
        if (!invalidTime(value)) {
          invalidType({ label, type });
        }
        break;

      case 'email':
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        if (!emailRegex.test(value)) {
          throw new ErrorMessage({
            statusCode: '400 BAD REQUEST',
            message: `O ${label} deve possuir o formato email@example.com`,
          });
        }
        break;

      case 'CEP':
        const CEPRegex = /^\d{8}$|^\d{5}-\d{3}$/;

        if (!CEPRegex.test(value)) {
          throw new ErrorMessage({
            statusCode: '400 BAD REQUEST',
            message: `O ${label} deve possuir o formato 00000-000`,
          });
        }

        break;

      case 'CPF':
        const CPFRegex = /^(?:\d{3}\.?\d{3}\.?\d{3}-?\d{2})$/;

        if (!CPFRegex.test(value)) {
          throw new ErrorMessage({
            statusCode: '400 BAD REQUEST',
            message: `O ${label} deve possuir o formato 000.000.000-00`,
          });
        }
        break;

      case 'CNPJ':
        const CNPJRegex = /^(\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}|\d{14})$/;

        if (!CNPJRegex.test(value)) {
          throw new ErrorMessage({
            statusCode: '400 BAD REQUEST',
            message: `O ${label} deve possuir o formato 00.000.000/0000-00`,
          });
        }
        break;

      default:
        break;
    }
  });
}
