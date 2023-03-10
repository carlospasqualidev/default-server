import axios from 'axios';
import { ErrorMessage } from '../../error';
import { IRequestHolidaysPerYear } from './types';

export const requestHolidaysPerYear = async ({
  year,
}: IRequestHolidaysPerYear) =>
  axios
    .get(`https://brasilapi.com.br/api/feriados/v1/${year}`)
    .then((res) => res.data)
    .catch((error) => {
      throw new ErrorMessage({
        statusCode: 400,
        message: error.response.data.message,
      });
    });
