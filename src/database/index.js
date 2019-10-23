// Importar sequelize que vai ser responsavel pela conexão com banco
import Sequelize from 'sequelize';
import mongoose from 'mongoose';
// Importar os models
import User from '../app/models/User';
import File from '../app/models/File';
import Appointment from '../app/models/Appointment';
// Importar configurações do banco de dados.
import databaseConfig from '../config/database';
// Criar array com todos os models da aplicação
const models = [User, File, Appointment];
// Criar a classe database
class Database {
  // Inserir metodo constructor
  constructor() {
    // Chamar o proprio metodo init, para separar classe e mais metodos de outars conexões
    this.init();
    this.mongo();
  }

  // Inserir metodo init, que vai fazere a conexão com a base de dados e carregar os models
  init() {
    // Instanciar a variavel connection para termos a conexão com a base de dados
    // A variavel connection é a que esta sendo esperada dentro dos models, dentro do metodo init
    this.connection = new Sequelize(databaseConfig);
    // Percorrer o array, de cada model e o metodo init, para passar a conexão
    // Loader de models
    models
      .map(model => model.init(this.connection))
      // Inserido map para adicionar avatar
      // Percorre os models e só chama o model.associate (segunda parte)se o mesmo existir
      // Se existir, chama o metodo passando os models localizados dentro dos parentesis
      .map(model => model.associate && model.associate(this.connection.models));
  }

  //
  mongo() {
    this.mongoConnection = mongoose.connect(
      // url de conexão do mongo
      'mongodb://localhost:27017/gobarber',
      // Objetos de configuração
      {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
      }
    );
  }
}

// Exporta por padrao a new Database, que é a nossa classe, para depois importar em outro arquivo
// Esse arquivo database tem que ser chamado de algum lugar (app.js)
export default new Database();
