import { Router } from 'express';

// #region PERMISSION
import { findManyPermissionsController } from './permission/findManyPermissionsController';

import {
  privateAdminPermissionMiddleware,
  privateCollaboratorPermissionMiddleware,
} from '../../utils/middlewares/private';
// #endregion

// #region USER
import {
  createUserController,
  fakeDeleteUserController,
  findManyUserController,
  updateUserController,
} from './user';

// #endregion

// #region Lender
import { findManyLenderController } from './lender/lender/findManyLenderController';

// #endregion

// #region LEGAL PERSON LENDER

import {
  createLegalPersonLenderController,
  fakeDeleteLegalPersonLenderController,
  findLegalPersonLenderController,
  updateLegalPersonLenderController,
} from './lender/legalPersonLender/legalPersonLender';

import { updateLegalPersonLenderAddressController } from './lender/legalPersonLender/legalPersonLenderAddress';
import { updateLegalPersonLenderResponsibleController } from './lender/legalPersonLender/legalPersonLenderResponsible';
import { updateLegalPersonLenderBankInfoController } from './lender/legalPersonLender/legalPersonLenderBankInfo';

// #endregion

// #region NATURAL PERSON LENDER
import {
  createNaturalPersonLenderController,
  fakeDeleteNaturalPersonLenderController,
  findNaturalPersonLenderController,
  updateNaturalPersonLenderController,
} from './lender/naturalPersonLender/naturalPersonLender';

import { updateNaturalPersonLenderAddressController } from './lender/naturalPersonLender/naturalPersonLenderAddress';
import { updateNaturalPersonLenderBankInfoController } from './lender/naturalPersonLender/naturalPersonLenderBankInfo';

// #endregion

// #region BORROWER
import { findManyBorrowerController } from './borrower/borrower/findManyBorrowerController';
// #endregion

// #region LEGAL PERSON BORROWER

import {
  createLegalPersonBorrowerController,
  fakeDeleteLegalPersonBorrowerController,
  findLegalPersonBorrowerController,
  updateLegalPersonBorrowerController,
} from './borrower/legalPersonBorrower/legalPersonBorrower';
import { updateLegalPersonBorrowerAddressController } from './borrower/legalPersonBorrower/legalPersonBorrowerAddress';
import { updateLegalPersonBorrowerBankInfoController } from './borrower/legalPersonBorrower/legalPersonBorrowerBankInfo';
import { updateLegalPersonBorrowerResponsibleController } from './borrower/legalPersonBorrower/legalPersonBorrowerResponsible';
// #endregion

// #region NATURAL PERSON BORROWER
import {
  createNaturalPersonBorrowerController,
  fakeDeleteNaturalPersonBorrowerController,
  findNaturalPersonBorrowerController,
  updateNaturalPersonBorrowerController,
} from './borrower/naturalPersonBorrower/naturalPersonBorrower';

import { updateNaturalPersonBorrowerAddressController } from './borrower/naturalPersonBorrower/naturalPersonBorrowerAddress';
import { updateNaturalPersonBorrowerBankInfoController } from './borrower/naturalPersonBorrower/naturalPersonBorrowerBankInfo';

// #endregion

// #region CONTRACT
import {
  createContractController,
  fakeDeleteContractController,
  findContractController,
  findManyBorrowerContractController,
  findManyContractController,
  findManyContractTypeController,
  findManyLenderContractController,
  updateContractController,
} from './contract/contract';
// #endregion

// #region CONTRACT ANNEXES
import { createContractAnnexController, deleteContractAnnexController } from './contract/annex';
// #endregion

// #region CONTRACT INSTALLMENT
import {
  findManyContractInstallmentController,
  findManyContractInstallmentStatusController,
} from './contract/contractInstallment';
// #endregion

// #region UPLOAD
import { uploadRouter } from '../../utils/upload/upload.routes';
// #endregion

export const privateRouter = Router();

// #region PERMISSIONS
privateRouter.get('/permissions', findManyPermissionsController);
// #endregion

// #region UPLOAD
privateRouter.use('/uploads', uploadRouter);
// #endregion

// #region USER
privateRouter.get('/users', privateCollaboratorPermissionMiddleware, findManyUserController);
privateRouter.post('/users', privateAdminPermissionMiddleware, createUserController);
privateRouter.put('/users', privateAdminPermissionMiddleware, updateUserController);
privateRouter.delete('/users/:userId', privateAdminPermissionMiddleware, fakeDeleteUserController);
// #endregion

// #region LENDER
privateRouter.get('/lenders', privateCollaboratorPermissionMiddleware, findManyLenderController);

// #endregion

// #region NATURAL PERSON LENDER
privateRouter.get(
  '/lenders/natural-person/:naturalPersonLenderId',
  privateCollaboratorPermissionMiddleware,
  findNaturalPersonLenderController,
);

privateRouter.post(
  '/lenders/natural-person',
  privateCollaboratorPermissionMiddleware,
  createNaturalPersonLenderController,
);

privateRouter.put(
  '/lenders/natural-person',
  privateCollaboratorPermissionMiddleware,
  updateNaturalPersonLenderController,
);

privateRouter.delete(
  '/lenders/natural-person/:naturalPersonLenderId',
  privateAdminPermissionMiddleware,
  fakeDeleteNaturalPersonLenderController,
);

// ADDRESS
privateRouter.put(
  '/lenders/natural-person/addresses',
  privateCollaboratorPermissionMiddleware,
  updateNaturalPersonLenderAddressController,
);

// BANK INFO
privateRouter.put(
  '/lenders/natural-person/bank-infos',
  privateCollaboratorPermissionMiddleware,
  updateNaturalPersonLenderBankInfoController,
);

// #endregion

// #region LEGAL PERSON LENDER
privateRouter.get(
  '/lenders/legal-person/:legalPersonLenderId',
  privateCollaboratorPermissionMiddleware,
  findLegalPersonLenderController,
);

privateRouter.post(
  '/lenders/legal-person',
  privateCollaboratorPermissionMiddleware,
  createLegalPersonLenderController,
);

privateRouter.put(
  '/lenders/legal-person',
  privateCollaboratorPermissionMiddleware,
  updateLegalPersonLenderController,
);

privateRouter.delete(
  '/lenders/legal-person/:legalPersonLenderId',
  privateAdminPermissionMiddleware,
  fakeDeleteLegalPersonLenderController,
);

// ADDRESS
privateRouter.put(
  '/lenders/legal-person/addresses',
  privateCollaboratorPermissionMiddleware,
  updateLegalPersonLenderAddressController,
);

// BANK INFO
privateRouter.put(
  '/lenders/legal-person/bank-infos',
  privateCollaboratorPermissionMiddleware,
  updateLegalPersonLenderBankInfoController,
);

// RESPONSIBLE
privateRouter.put(
  '/lenders/legal-person/responsibles',
  privateCollaboratorPermissionMiddleware,
  updateLegalPersonLenderResponsibleController,
);

// #endregion

// #region BORROWER
privateRouter.get(
  '/borrowers',
  privateCollaboratorPermissionMiddleware,
  findManyBorrowerController,
);
// #endregion

// #region LEGAL PERSON BORROWER
privateRouter.get(
  '/borrowers/legal-person/:legalPersonBorrowerId',
  privateCollaboratorPermissionMiddleware,
  findLegalPersonBorrowerController,
);

privateRouter.post(
  '/borrowers/legal-person',
  privateCollaboratorPermissionMiddleware,
  createLegalPersonBorrowerController,
);

privateRouter.put(
  '/borrowers/legal-person',
  privateCollaboratorPermissionMiddleware,
  updateLegalPersonBorrowerController,
);

privateRouter.delete(
  '/borrowers/legal-person/:legalPersonBorrowerId',
  privateAdminPermissionMiddleware,
  fakeDeleteLegalPersonBorrowerController,
);

// ADDRESS
privateRouter.put(
  '/borrowers/legal-person/addresses',
  privateCollaboratorPermissionMiddleware,
  updateLegalPersonBorrowerAddressController,
);

// BANK INFO
privateRouter.put(
  '/borrowers/legal-person/bank-infos',
  privateCollaboratorPermissionMiddleware,
  updateLegalPersonBorrowerBankInfoController,
);

// RESPONSIBLE
privateRouter.put(
  '/borrowers/legal-person/responsibles',
  privateCollaboratorPermissionMiddleware,
  updateLegalPersonBorrowerResponsibleController,
);
// #endregion

// #region NATURAL PERSON BORROWER
privateRouter.get(
  '/borrowers/natural-person/:naturalPersonBorrowerId',
  privateCollaboratorPermissionMiddleware,
  findNaturalPersonBorrowerController,
);

privateRouter.post(
  '/borrowers/natural-person',
  privateCollaboratorPermissionMiddleware,
  createNaturalPersonBorrowerController,
);

privateRouter.put(
  '/borrowers/natural-person',
  privateCollaboratorPermissionMiddleware,
  updateNaturalPersonBorrowerController,
);

privateRouter.delete(
  '/borrowers/natural-person/:naturalPersonBorrowerId',
  privateAdminPermissionMiddleware,
  fakeDeleteNaturalPersonBorrowerController,
);

// ADDRESS
privateRouter.put(
  '/borrowers/natural-person/addresses',
  privateCollaboratorPermissionMiddleware,
  updateNaturalPersonBorrowerAddressController,
);

// BANK INFO
privateRouter.put(
  '/borrowers/natural-person/bank-infos',
  privateCollaboratorPermissionMiddleware,
  updateNaturalPersonBorrowerBankInfoController,
);

// #endregion

// #region CONTRACT
privateRouter.get(
  '/contracts-borrowers',
  privateCollaboratorPermissionMiddleware,
  findManyBorrowerContractController,
);

privateRouter.get(
  '/contracts-lenders',
  privateCollaboratorPermissionMiddleware,
  findManyLenderContractController,
);

privateRouter.get(
  '/contracts/types',
  privateCollaboratorPermissionMiddleware,
  findManyContractTypeController,
);

privateRouter.get(
  '/contracts',
  privateCollaboratorPermissionMiddleware,
  findManyContractController,
);
privateRouter.get(
  '/contracts/:contractId',
  privateCollaboratorPermissionMiddleware,
  findContractController,
);
privateRouter.delete(
  '/contracts/:contractId',
  privateAdminPermissionMiddleware,
  fakeDeleteContractController,
);
privateRouter.post('/contracts', privateCollaboratorPermissionMiddleware, createContractController);
privateRouter.put('/contracts', privateAdminPermissionMiddleware, updateContractController);

// #endregion

// #region CONTRACT ANNEXES
privateRouter.post(
  '/contracts/annexes',
  privateCollaboratorPermissionMiddleware,
  createContractAnnexController,
);
privateRouter.delete(
  '/contracts/annexes/:contractAnnexId',
  privateAdminPermissionMiddleware,
  deleteContractAnnexController,
);
// #endregion

// #region CONTRACT INSTALLMENT
privateRouter.get(
  '/contracts-installments',
  privateCollaboratorPermissionMiddleware,
  findManyContractInstallmentController,
);

privateRouter.get(
  '/contracts-installments-status',
  privateCollaboratorPermissionMiddleware,
  findManyContractInstallmentStatusController,
);

// #endregion
