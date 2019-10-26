// Importar Router do express e não o express interiro
// Forma de separar o roteamento do express em outro arquivo
// _const { Router } = require('express');//Maneira antiga
// Import habilitado com a instalação do sucrase
import { Router } from 'express';
// Importar o multer
import multer from 'multer';
// Importar as config do multer
import multerConfig from './config/multer';
// Importar UserController
import UserController from './app/controllers/UserController';
// Importar essionController
import SessionController from './app/controllers/SessionController';
// Importar middleware de autenticação
import authMiddleware from './app/middlewares/auth';
// Importar filecontroller
import FileController from './app/controllers/FileController';
// Importar provider controller
import ProviderController from './app/controllers/ProviderController';
//
import AppointmentController from './app/controllers/AppointmentController';
//
import ScheduleController from './app/controllers/ScheduleController';
//
import NotificationController from './app/controllers/NotificationController';
//
import AvailableController from './app/controllers/AvailableController';

// Definir variavel com os dados do Router
const routes = new Router();
// Ciar variavel upload com config como parametro
const upload = multer(multerConfig);
// Criar rota de post
routes.post('/users', UserController.store);
// Criar rota para acessar o sessioncontroller
routes.post('/sessions', SessionController.store);
// Este middleware so´é aplicado nas rotas baixo deste middleware
routes.use(authMiddleware);
// Criar rota para para atualizar dados
routes.put('/users', UserController.update);
// Criar rota para provider
routes.get('/providers', ProviderController.index);
// Rota para todos os horarios disponiveis para este Id. Importando o metodo index
routes.get('/providers/:providerId/available', AvailableController.index);
// Criar rota para listagem dos agendamentos do usuario logado
routes.get('/appointments', AppointmentController.index);
// Criar rota appointment conforme controllers
routes.post('/appointments', AppointmentController.store);
//
routes.delete('/appointments/:id', AppointmentController.delete);
//
routes.get('/schedules', ScheduleController.index);
// Criar rota de notificaçoes, somente para prestadores de serviço
routes.get('/notifications', NotificationController.index);
// Rota para marcar notificação como lida
routes.put('/notifications/:id', NotificationController.update);
// Criar rota post para files. Como segundo parametro colocamos um middleware a mais
// que vai se chamar upload (definido acima) sendo single (um arquivo por vez)
// eenviando o nome do campo em file.
// Inserido metodo filecontroller.store de de criar a pasta FileController
routes.post('/files', upload.single('file'), FileController.store);

// Exportando as minhas rotas
// _module.exports = routes//Maneira antiga
// Export habilitado com a instalação do sucrase
export default routes;
