// Importar notification
import User from '../models/User';
// Import schema notification
import Notification from '../schemas/Notification';
// Definir classe NotificationController
class NotificationController {
  // Com metodo index aqui dentro
  async index(req, res) {
    const checkIsProvider = await User.findOne({
      // Um registro onde o registro do usuario logado seja provider
      where: { id: req.userId, provider: true },
    });
    // Se não encontrar nenhum provider (false)
    if (!checkIsProvider) {
      // Retorna uma mensagem de erro
      return res
        .status(401)
        .json({ error: 'Only provider can load notifications' });
    }
    // Variavel notifications e o schema de Notification com metodo find do mongo
    const notifications = await Notification.find({
      // Filtros
      user: req.userId,
    })
      // Ordenar por createdAt
      .sort('createdAt')
      // Limitar a 20 resultados
      .limit(20);
    // Retorna as notificações
    return res.json(notifications);
  }
}
// Exportação padrão
export default new NotificationController();
