import { Request, Response } from 'express';

import { checkValues } from '../../../../../utils/validator';

import {
  findNaturalPersonLenderAddressByIdService,
  updateNaturalPersonLenderAddressService,
} from '../../../../../services/lender/naturalPersonLender/naturalPersonLenderAddress';

interface IBody {
  naturalPersonLenderAddressId: string;
  state: string;
  city: string;
  complement: string;
  neighborhood: string;
  number: string;
  street: string;
  zipCode: string;
}

export async function updateNaturalPersonLenderAddressController(req: Request, res: Response) {
  const {
    naturalPersonLenderAddressId,
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
      label: 'ID do endereço do cliente',
      type: 'string',
      value: naturalPersonLenderAddressId,
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

  await findNaturalPersonLenderAddressByIdService({ naturalPersonLenderAddressId });

  // #endregion

  const legalPersonLender = await updateNaturalPersonLenderAddressService({
    data: {
      state,
      city,
      complement,
      neighborhood,
      number,
      street,
      zipCode,
    },
    naturalPersonLenderAddressId,
  });

  return res.status(200).json({
    legalPersonLender,
    message: 'Endereço atualizado com sucesso!',
  });
}
