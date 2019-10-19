// Importar Router do express e não o express interiro
// Forma de separar o roteamento do express em outro arquivo
// _const { Router } = require('express');//Maneira antiga
// Import habilitado com a instalação do sucrase
import { Router } from 'express';
// Importar UserController
import UserController from './app/controllers/UserController';
// Importar essionController
import SessionController from './app/controllers/SessionController';
// Importar middleware de autenticação
import authMiddleware from './app/middlewares/auth';

// Definir variavel com os dados do Router
const routes = new Router();
// Criar rota de post
routes.post('/users', UserController.store);
// Criar rota para acessar o sessioncontroller
routes.post('/sessions', SessionController.store);
// Este middleware so´é aplicado nas rotas baixo deste middleware
routes.use(authMiddleware);
// Criar rota para para atualizar dados
routes.put('/users', UserController.update);

// Exportando as minhas rotas
// _module.exports = routes//Maneira antiga
// Export habilitado com a instalação do sucrase
export default routes;
