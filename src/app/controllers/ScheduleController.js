//
import { startOfDay, endOfDay, parseISO } from 'date-fns';
//
import { Op } from 'sequelize';
// Importar Usuarios
import User from '../models/User';
// Importar Appointment dos models
import Appointment from '../models/Appointment';

// Criar classe ScheduleController
class ScheduleController {
  // Criar metodo index para listagem
  async index(req, res) {
    // Verificar se o usuario logado é prestador de serviço
    const checkUserProvider = await User.findOne({
      where: { id: req.userId, provider: true },
    });
    // Retorno de mensagem de erro
    if (!checkUserProvider) {
      return res.status(401).json({ error: 'User is not a provider' });
    }
    // Buscar date
    const { date } = req.query;
    //
    const parsedDate = parseISO(date);
    // Criar variavel appointments que vai listar todos os agendamentos
    const appointments = await Appointment.findAll({
      // Verificar agendamento do usuario logado
      where: {
        provider_id: req.userId,
        canceled_at: null,
        // Verificar agendamentos entre dois horarios na data inserida
        date: {
          [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)],
        },
      },
      // Ordenar agendamentos por data
      order: ['date'],
    });
    // Criar retorno com json (só para não dar erro, e poder criar a rota)
    return res.json({ appointments });
  }
}
// Exportar por padrão new ScheduleController
export default new ScheduleController();
