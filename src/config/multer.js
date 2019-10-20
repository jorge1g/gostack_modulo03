// Configuração da parte de uploads de arquivos
// Importar o multer
import multer from 'multer';
// Importar biblioteca do node chamada crypto usadsa para gerar carcteres aleatorios
import crypto from 'crypto';
// Importar do path somente duas funçoes que são o extaname (retorna a extensão de um arquivo)
// e o resolve (que é para percorrer o caminho dentro da aplicação)
import { extname, resolve } from 'path';
// Exportar objeto de configuração
export default {
  // No storage temos como o multer vai guardar os arquivos de imagem (neste caso
  // vamos guardar dentro do arquivo da aplicação na pasta temp (diskstorage))
  storage: multer.diskStorage({
    // Destino dos arquivos
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    // Filename aceita uma função com 3 proprieades. (arrow function)
    // Dentro do filename e como vamos formatar o nome do arquivo de imagem
    filename: (req, file, cb) => {
      // RandomBytes tem o numero de bytes que se quer gerar.Esta função recebe um erro ou
      // uma resposta caso esteja tudo ok
      crypto.randomBytes(16, (err, res) => {
        // Se der erro retornamos o cb, passando o erro acima
        if (err) return cb(err);
        // O cb pai passar o null no primeiro parametro e no segundo parametro
        // o nome da imagem em si, passando 16 bytes aleatorios em uma string hexadecimal
        // concatenando com o nome original do arquivo
        return cb(null, res.toString('hex') + extname(file.originalname));
      });
    },
  }),
};
