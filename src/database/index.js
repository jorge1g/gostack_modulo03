// Importar sequelize que vai ser responsavel pela conexão com banco
import Sequelize from 'sequelize';
// Importar os models
import User from '../app/models/User';
// Importar configurações do banco de dados.
import databaseConfig from '../config/database';
// Criar array com todos os models da aplicação
const models = [User];
// Criar a classe database
class Database {
  // Inserir metodo constructor
  constructor() {
    // Chamar o proprio metodo init, para separar classe e mais metodos de outars conexões
    this.init();
  }

  // Inserir metodo init, que vai fazere a conexão com a base de dados e carregar os models
  init() {
    // Instanciar a variavel connection para termos a conexão com a base de dados
    // A variavel connection é a que esta sendo esperada dentro dos models, dentro do metodo init
    this.connection = new Sequelize(databaseConfig);
    // Percorrer o array, de cada model e o metodo init, para passar a conexão
    models.map(model => model.init(this.connection));
  }
}

// Exporta por padrao a new Database, que é a nossa classe, para depois importar em outro arquivo
// Esse arquivo database tem que ser chamado de algum lugar (app.js)
export default new Database();
