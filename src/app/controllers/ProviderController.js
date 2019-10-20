// Importar user porque um provider é um user
import User from '../models/User';
// Importa para disponibilizar dados para o include
import File from '../models/File';
//
class ProviderController {
  // Index utilizado para listagem
  async index(req, res) {
    // Essa linha retorna todos os usuarios
    const providers = await User.findAll({
      // Inserir condição where para retornar somente provider
      where: { provider: true },
      // Selecionar as informaçoes que deverão retornar
      attributes: ['id', 'name', 'email', 'avatar_id'],
      // Para retornar todos os dados do avatar
      // Include é um array, podemos incluir quantos relacionamentos quisermos
      include: [
        {
          model: File,
          // Alterando o nome de File para avatar
          as: 'avatar',
          // Selecionar as informaçoes que deverão retornar
          attributes: ['name', 'path', 'url'],
        },
      ],
    });
    // Retorna os providers
    return res.json(providers);
  }
}
// Exportar por padrão
export default new ProviderController();
