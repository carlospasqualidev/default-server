export function handlePrismaErrors(error: any) {
  const customErrors: { [key: string]: string } = {
    P2002: `A informação: ${error.meta?.target} já existe na base de dados.`,
    P2003: 'Identificador único não encontrado na base de dados.',
    P2024: 'Erro de comunicação com a base de dados.',
    P2025: 'Registro não encontrado na base de dados.',
  };

  return customErrors[error.code] || 'Oops! Encontramos um problema e nossa equipe foi notificada.';
}
