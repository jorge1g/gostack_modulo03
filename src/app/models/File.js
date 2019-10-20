// Importar model de dentro do sequelize
// Importar sequelize d dentro do sequelize
import Sequelize, { Model } from 'sequelize';

// Definir classe user extends model
class File extends Model {
  // Definir metodo extatico chamado init, vai receber sequelize como parametro
  // Vai ser chamado automaticamente pelo sequelize.
  static init(sequelize) {
    super.init(
      {
        // Primeiro parametro é um objeto contendo as colunas abaixo
        // Inserir somente colunas que serão usadas no cadastramento de novo usuario
        name: Sequelize.STRING,
        path: Sequelize.STRING,
      },
      {
        // O sequelize recebido como parametro precisa ser passado dentro de um objeto
        // também como segundo parametro da super.init
        sequelize,
      }
    );
    return this;
  }
}
// Exporta usuario
export default File;
