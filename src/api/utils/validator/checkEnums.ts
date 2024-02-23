import { checkNeedExists } from './checkNeedExists';
import { ICheckEnums } from './types';

export function checkEnums(data: ICheckEnums[]) {
  data.forEach(({ enums, label, value }) => {
    const isValid = enums[value];
    checkNeedExists([{ label, value: isValid }]);
  });
}
