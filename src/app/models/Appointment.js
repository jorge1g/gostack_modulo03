// Importar model de dentro do sequelize
// Importar sequelize d dentro do sequelize
import Sequelize, { Model } from 'sequelize';
import { isBefore, subHours } from 'date-fns';

// Definir classe user extends model
class Appointment extends Model {
  // Definir metodo extatico chamado init, vai receber sequelize como parametro
  // Vai ser chamado automaticamente pelo sequelize.
  static init(sequelize) {
    super.init(
      {
        // Primeiro parametro é um objeto contendo as colunas abaixo
        // Inserir somente colunas que serão usadas no cadastramento de novo serviço
        date: Sequelize.DATE,
        canceled_at: Sequelize.DATE,
        // Agendamentos já passados
        past: {
          type: Sequelize.VIRTUAL,
          get() {
            // Verificar se a data do lançamento é inferior a data atual
            // retorna true se a data passou e false se ainda não tenha passado
            return isBefore(this.date, new Date());
          },
        },
        // Verificar se o agendamento é cancelavel oiu não (duas horas antes)
        cancelable: {
          type: Sequelize.VIRTUAL,
          get() {
            // Verifica se a data atual e inferior a subHours menos 2 horas
            return isBefore(new Date(), subHours(this.date, 2));
          },
        },
      },
      {
        // O sequelize recebido como parametro precisa ser passado dentro de um objeto
        // também como segundo parametro da super.init
        sequelize,
      }
    );
    return this;
  }

  // Gerar um relacionamento usando o metodo static associate que recebe os models
  static associate(models) {
    // A tabela de agendamento vai pertencer ao model de usuario, porque um usuario marcou agendamento
    // Quando tiver dois relacionamentos tem que usar o "as"
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.User, { foreignKey: 'provider_id', as: 'provider' });
  }
}
// Exporta usuario
export default Appointment;
