import { IHandlerTemplate } from '../types';
import { emailTemplate } from './templates';

export function handlerTemplate({ template, variables }: IHandlerTemplate) {
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
}
