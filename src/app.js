// Importantando dependencia do express
// Instalando sucrase para poder utilizar o import
// _const express = require('express');//Maneira antiga
import express from 'express';
// Definir variavel com a rota
// _const routes = require('./routes');//Maneira antiga
import routes from './routes';
// Importar database de index de migrations
import './database';

// Definir classe do app (Deve ser chamada apenas uma vez)
class App {
  // Metodo constructor é executado automaticamente quando a classe é chamada
  constructor() {
    // Definindo variavel server que vai receber express
    this.server = express();
    // Chamar os metodos middleware e routes dentro do constructor, se não nunca serão chamados
    this.middleware();
    this.routes();
  }

  // Cadastrar os middlewares da aplicação
  middleware() {
    // Configurar para receber requisições no formato de JSON
    this.server.use(express.json());
  }

  // Cadastrar as rotas da aplicação
  routes() {
    // Importar rotas de outro arquivo (routes definido no inicio)
    this.server.use(routes);
  }
}

// Exportando uma nova instancia de App com dados do server
// _module.exports = new App().server;//Maneira antiga
// Export habilitado com a instalação do sucrase
export default new App().server;
