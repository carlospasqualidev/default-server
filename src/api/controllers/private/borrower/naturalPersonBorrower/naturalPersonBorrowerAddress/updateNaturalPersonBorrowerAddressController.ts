import { Request, Response } from 'express';

import { checkValues } from '../../../../../utils/validator';
import {
  findNaturalPersonBorrowerAddressByIdService,
  updateNaturalPersonBorrowerAddressService,
} from '../../../../../services/borrower/naturalPersonBorrower/naturalPersonBorrowerAddress';

interface IBody {
  naturalPersonBorrowerAddressId: string;
  state: string;
  city: string;
  complement: string;
  neighborhood: string;
  number: string;
  street: string;
  zipCode: string;
}

export async function updateNaturalPersonBorrowerAddressController(req: Request, res: Response) {
  const {
    naturalPersonBorrowerAddressId,
    city,
    complement,
    neighborhood,
    number,
    state,
    street,
    zipCode,
  }: IBody = req.body;

  // #region VALIDATIONS
  checkValues([
    {
      label: 'ID do endereço do devedor',
      type: 'string',
      value: naturalPersonBorrowerAddressId,
    },
    {
      label: 'estado',
      type: 'string',
      value: state,
    },
    {
      label: 'cidade',
      type: 'string',
      value: city,
    },
    {
      label: 'complemento',
      type: 'string',
      value: complement,
    },
    {
      label: 'bairro',
      type: 'string',
      value: neighborhood,
    },
    {
      label: 'número',
      type: 'string',
      value: number,
    },
    {
      label: 'rua',
      type: 'string',
      value: street,
    },
    {
      label: 'CEP',
      type: 'string',
      value: zipCode,
    },
  ]);

  await findNaturalPersonBorrowerAddressByIdService({ naturalPersonBorrowerAddressId });

  // #endregion

  const legalPersonBorrower = await updateNaturalPersonBorrowerAddressService({
    data: {
      state,
      city,
      complement,
      neighborhood,
      number,
      street,
      zipCode,
    },
    naturalPersonBorrowerAddressId,
  });

  return res.status(200).json({
    legalPersonBorrower,
    message: 'Endereço atualizado com sucesso!',
  });
}
