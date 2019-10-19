// Importar o jsonwebtoken que vai gerar o token jwt
// Tem que ser em cima do usuario pois é uma importação de modo
import jwt from 'jsonwebtoken';
// Importar yup para validação de dados digitados nos campos de entrada.
// O yup não tem export default, então tem que importar tudo do arquivo yup atraves do *
import * as Yup from 'yup';
// Importar o usuario
import User from '../models/User';
// Importar autenticação
import authConfig from '../../config/auth';
// Criar a classe sessioncontroller
class SessionController {
  // Metodo store para criação da sessão
  async store(req, res) {
    // Antes de fazer as verificações, faz-se as validações dos dados de entrada atraves do Yup
    // Criar a variavel schema, pois yup segue o schema validation
    // O yup vai validar um objeto, atraves do formato definido por shape
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
    });
    // Verificação se o req.body esta passando conforme o schema acima
    // Se estiver tudo OK retorna true e segue, se for false dispara o erro
    if (!(await schema.isValid(req.body))) {
      // Mensagem de erro
      return res.status(400).json({ error: 'Validation fails' });
    }

    // Pegar o email e senha do corpo da requisição
    const { email, password } = req.body;
    // Verificar se existe o email e retorna o user
    const user = await User.findOne({ where: { email } });
    // Com o usuario dentro do user, faz-se a validação
    if (!user) {
      // Se o usuario não existir retorna codigo de erro e mensagem.
      return res.status(401).json({ error: 'User not found' });
    }
    // Se o usuario existir temos que ver se a senha confere.
    // O metodo de verificação de senha vai ser feito dentro do model
    // Verificar se as senhas não estão batendo
    if (!(await user.checkPassword(password))) {
      // Se a senha não bater retorna codigo de erro e mensagem.
      return res.status(401).json({ error: 'Password does not match' });
    }
    // Se o email e senha batem, pega-se o id e nome para retornar apos fazer o login
    const { id, name } = user;
    // Retorna-se os dados do usuario atraves de json
    return res.json({
      user: {
        id,
        name,
        email,
      },
      // Retorna-se também o token, gerado atraves do jwt pelo metodo sign.
      // Precisa ser enviado o payload, que são informações adicionais incorporadas dentro do token
      // O payload é um objeto, então foi colocado dentro do token o id do usuario,
      // o segundo parametro é um texto unico gerado por MD5
      // Alterações apos implementação do auth.js
      // _token: jwt.sign({ id }, 'f29618255c309de4469993cce24286ea', {
      token: jwt.sign({ id }, authConfig.secret, {
        // terceiro parametro. Todo token jwt tem uma data de expiração
        // _expiresIn: '7d',
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}
// Exportar daqui de dentro uma new SessionControler
export default new SessionController();
