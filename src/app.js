import 'dotenv/config';
// Importantando dependencia do express
// Instalando sucrase para poder utilizar o import
// _const express = require('express');//Maneira antiga
import express from 'express';
// Importar o path do routes para passar o caminho para o express.static
import path from 'path';
//
import Youch from 'youch';
//
import * as Sentry from '@sentry/node';
//
import 'express-async-errors';
// Definir variavel com a rota
// _const routes = require('./routes');//Maneira antiga
import routes from './routes';
//
import sentryConfig from './config/sentry';

// Importar database de index de migrations
import './database';

// Definir classe do app (Deve ser chamada apenas uma vez)
class App {
  // Metodo constructor é executado automaticamente quando a classe é chamada
  constructor() {
    // Definindo variavel server que vai receber express
    this.server = express();
    // Inicializar o Sentry
    Sentry.init(sentryConfig);

    // Chamar os metodos middleware e routes dentro do constructor, se não nunca serão chamados
    this.middleware();
    this.routes();
    this.exceptionHandler();
  }

  // Cadastrar os middlewares da aplicação
  middleware() {
    this.server.use(Sentry.Handlers.requestHandler());
    // Configurar para receber requisições no formato de JSON
    this.server.use(express.json());
    // Usar express.static para disponibilizar arquivos que serão acessados pelo navegador
    this.server.use(
      // Rota que vai disponibilizar os arquivos estaticos
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  // Cadastrar as rotas da aplicação
  routes() {
    // Importar rotas de outro arquivo (routes definido no inicio)
    this.server.use(routes);
    this.server.use(Sentry.Handlers.errorHandler());
  }

  // Metodo exceptionHandler
  exceptionHandler() {
    // Cadastrar um novo middleware. Quando um middleware recebe 4 parametros (middleware de tratamento
    // de exceções)
    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        //
        const errors = await new Youch(err, req).toJSON();
        // Retorna erro de servidor
        return res.status(500).json(errors);
      }

      return res.status(500).json({ error: 'Internal server error' });
    });
  }
}

// Exportando uma nova instancia de App com dados do server
// _module.exports = new App().server;//Maneira antiga
// Export habilitado com a instalação do sucrase
export default new App().server;
