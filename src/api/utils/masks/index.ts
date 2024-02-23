export function mask({
  type,
  value,
}: {
  type: 'CPF' | 'CNPJ' | 'TEL' | 'CEP' | 'BRL' | 'NUM' | 'DEC';
  value: string;
}) {
  let formattedValue = '';

  switch (type) {
    case 'CPF':
      formattedValue = value
        .replace(/\D/g, '')
        .replace(/^(\d{9})(\d)/g, '$1-$2')
        .replace(/^(\d{6})(\d)/g, '$1.$2')
        .replace(/^(\d{3})(\d)/g, '$1.$2')
        .substring(0, 14);
      break;

    case 'CNPJ':
      formattedValue = value
        .replace(/\D/g, '')
        .replace(/^(\d{12})(\d)/g, '$1-$2')
        .replace(/^(\d{8})(\d)/g, '$1/$2')
        .replace(/^(\d{5})(\d)/g, '$1.$2')
        .replace(/^(\d{2})(\d)/g, '$1.$2')
        .substring(0, 18);
      break;

    case 'CEP':
      formattedValue = value
        .replace(/\D/g, '')
        .replace(/^(\d{5})(\d)/g, '$1-$2')
        .substring(0, 9);
      break;

    case 'TEL':
      formattedValue = value
        .replace(/\D/g, '')
        .replace(/^(\d{2})(\d)/g, '($1) $2')
        .replace(/(\d)(\d{4})$/, '$1-$2')
        .substring(0, 15);
      break;

    case 'BRL':
      formattedValue = (Number(value.replace(/[^0-9]*/g, '')) / 100)

        .toLocaleString('pt-br', {
          style: 'currency',
          currency: 'BRL',
        })
        .substring(0, 30);

      break;

    case 'NUM':
      formattedValue = value.replace(/[^0-9]*/g, '').substring(0, 30);
      break;

    case 'DEC':
      formattedValue = (Number(value.replace(/[^0-9]*/g, '')) / 100)
        .toLocaleString('pt-br', {
          minimumFractionDigits: 2,
        })
        .substring(0, 30);
      break;

    default:
      break;
  }
  return formattedValue;
}

export function unMask(value: string | number) {
  return String(value).replace(/[^0-9]/g, '');
}

export function dotToComma(value: string) {
  return value.replaceAll('.', ',');
}
