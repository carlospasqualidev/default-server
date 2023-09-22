import { ErrorMessage } from '../error';
import { ICheckValues } from './types';

function invalidType({ label, type }: { label: string; type: string }) {
  throw new ErrorMessage({
    statusCode: 400,
    message: `A informação: ${label} deve possuir o tipo ${type}.`,
  });
}

function invalidFormat(label: string) {
  throw new ErrorMessage({
    statusCode: 400,
    message: `A informação: ${label} deve possuir um formato válido.`,
  });
}

function invalidTypeLength({ label, type }: { label: string; type: string }) {
  throw new ErrorMessage({
    statusCode: 400,
    message: `A informação: ${label} ultrapassa o tamanho do tipo ${type}.`,
  });
}

export function checkValues(values: ICheckValues[]) {
  values.forEach(({ label, type, value, required: requiredParam }) => {
    const required =
      requiredParam === undefined || requiredParam === null || typeof requiredParam !== 'boolean'
        ? true
        : requiredParam;

    if (required && (value === null || value === undefined)) {
      throw new ErrorMessage({
        statusCode: 400,
        message: `Verifique o valor da informação: ${label} e tente novamente.`,
      });
    }

    if (!required && (value === null || value === undefined || value === '')) return;

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
          invalidFormat(label);
        }

        const checkDate = new Date(value);

        if (checkDate.toString() === 'Invalid Date') {
          invalidFormat(label);
        }
        break;

      case 'json':
        try {
          JSON.parse(String(value));
        } catch (error) {
          invalidFormat(label);
        }
        break;

      default:
        break;
    }
  });
}
