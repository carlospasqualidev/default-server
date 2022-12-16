import { IHandlerTemplate } from '../types';
import { emailTemplate } from './templates';

export const handlerTemplate = ({ template, variables }: IHandlerTemplate) => {
  switch (template) {
    case 'confirmEmail':
      return emailTemplate({
        variables,
      });

    default:
      return emailTemplate({
        variables,
      });
  }
};
