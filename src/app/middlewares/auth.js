// Configuração da parte de autenticação da aplicação.
// Importação fo jwt
import jwt from 'jsonwebtoken';
// Importar o promisify da biblioteca util
import { promisify } from 'util';
// Importamos o segredo do token para verificar se esta valido
import authConfig from '../../config/auth';
// Inserido async para utilizar o promisify
// O next é para determinar se a função vai continuar ou não
export default async (req, res, next) => {
  const authHeader = req.headers.authorization;
  // Se o header não estiver presente, já retorna um status
  if (!authHeader) {
    // Status 401 de não autorizado, mais a mensagem de token não enviado
    return res.status(401).json({ error: 'Token not provid' });
  }
  // Vamos dividir a header, com o split. Separamos o Bearer do token a partir do espaço
  // A variavel vai retornar um array de duas posições, sendo na primeira posição o Baerer
  // que é descartado colocando somente uma virgula no array (desestruturado)
  const [, token] = authHeader.split(' ');

  try {
    // Pega-se o valor retornado pelo jwt
    // Temos uma segunda função pegando o valor retonado da primeira função
    // Vamos ter dentro do decoded o id do usuario
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    // Com a autenticação valida temos o id do usuario logado, então iserimos este id do
    // usuario dentro do req do userId
    req.userId = decoded.id;

    return next();
  } catch (err) {
    // Se retornar erro temos a mensagem de Token invalido
    return res.status(401).json({ error: 'Token invalid' });
  }
};
