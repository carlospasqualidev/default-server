export const createUser = async (req, res) => {
  // #swagger.tags = ['User']
  // #swagger.description = 'Endpoint para obter um usuário.'
  // #swagger.parameters['id'] = { description: 'ID do usuário.' }

  /* #swagger.parameters['filtro'] = {
	       in: 'query',
               description: 'Um filtro qualquer.',
               type: 'string'
        } */ // #swagger.tags = ['User']
  // #swagger.description = 'Endpoint para obter um usuário.'

  const { userId, tanso }: { userId: string; tanso: string } = req.body;

  console.log(userId, tanso);

  /* #swagger.responses[200] = {
               schema: { $ref: "#/definitions/User" },
               description: 'Usuário encontrado.'
} */

  return res.status(200).send({ id: userId });
};
