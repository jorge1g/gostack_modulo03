// Importar o app
// _const app = require('./app');//Maneira antiga
// Import habilitado com a instalação do sucrase
import app from './app';

// Abrir a porta 3333 (Separar estrutura da aplicação da parte do servidor)
app.listen(3333);
