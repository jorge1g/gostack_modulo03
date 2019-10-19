// Dentro de um controller so podemos ter uma vez o mesmo metodo, que são
// o store, index, show, update e delete

// Importar yup para validação de dados digitados nos campos de entrada.
// O yup não tem export default, então tem que importar tudo do arquivo yup atraves do *
import * as Yup from 'yup';

// Importar models de usuario, porque vai ser usado direto aqui
import User from '../models/User';
// A classe dele é basicamente uma classe, e todo controller vai seguir esta classe
class UserController {
  // Definir uma função para cadastro de usuario, terá a mesma face que um middleware
  // Vai receber dados por React e React Native
  async store(req, res) {
    // Antes de fazer as verificações, faz-se as validações dos dados de entrada atraves do Yup
    // Criar a variavel schema, pois yup segue o schema validation
    // O yup vai validar um objeto, atraves do formato definido por shape
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      // O email() valida a formatação de email
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(4),
    });
    // Verificação se o req.body esta passando conforme o schema acima
    // Se estiver tudo OK retorna true e segue, se for false dispara o erro
    if (!(await schema.isValid(req.body))) {
      // Mensagem de erro
      return res.status(400).json({ error: 'Validation fails' });
    }
    // Verificação de usuario antes de cadastrar novo usuario
    // findOne = tentar encontrar um usuario conforme a serie de regras de condicionais
    const userExists = await User.findOne({ where: { email: req.body.email } });
    // Se existir retorna nulo ignorando o if
    if (userExists) {
      // Se existir usuario, bloqueia-se o fluxo dando um return e retornado mensagem de erro
      return res.status(400).json({ error: 'User already exists.' });
    }
    // Criar novo registro dentro da base de dados atraves de req.body
    // Pega-se todos os dados definidos em User.js de models
    // Alterando para retornar somente os campos necessarios para o usuario.
    // _const user = await User.create(req.body);
    const { id, name, email, provider } = await User.create(req.body);
    // Retorna informações em formato de json
    // Concluindo alterações feitas na linha de cima
    // _return res.json(user);
    return res.json({
      id,
      name,
      email,
      provider,
    });
  }

  // Toda a rota a partir do middleware de identificaçaõ temos o req do user id com o usuario logado
  async update(req, res) {
    // Antes de editar, faz-se as validações dos dados de entrada atraves do Yup
    // Criar a variavel schema, pois yup segue o schema validation
    // O yup vai validar um objeto, atraves do formato definido por shape
    const schema = Yup.object().shape({
      name: Yup.string(),
      // O email() valida a formatação de email
      email: Yup.string().email(),
      oldpassword: Yup.string().min(4),
      password: Yup.string()
        .min(4)
        // Validação condicional atraves do when. Vamos validar quando a oldpassword for preenchida,
        // a password é obrigatoria. O segundo parametro é uma função que recebe o proprio olpassword
        // e o segundo parametro é a continuação do password
        // Como não se declara corpo na função {}, e a mesma coisa de fazer um return
        .when('oldPassword', (oldPassword, field) =>
          // Vamos retornar da função: Checa preenchimento da oldpassword (nulo, vazio)
          // estando ok faz-se com que o field seja required (field se refere ao password acima)
          // se não ok, retorna o field da forma anterior sem ser obrigatorio
          oldPassword ? field.required() : field
        ),
      // Quando houver alteração de password temos que solicitar confirmação de password.
      // Através do when, quando o password estiver preenchido, rebemos o password e o field
      confirmPassword: Yup.string().when('password', (password, field) =>
        // Faz-se o required obrigatorio e precisa ser igual ao password.
        // Declaramos o oneOf com um array dos possiveis valores, que no caso busca
        // atraves de ref um valor em outro campo, que no caso é de password
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });
    // Verificação se o req.body esta passando conforme o schema acima
    // Se estiver tudo OK retorna true e segue, se for false dispara o erro
    if (!(await schema.isValid(req.body))) {
      // Mensagem de erro
      return res.status(400).json({ error: 'Validation fails' });
    }

    // Busca-se o email e oldpassword no body
    const { email, oldPassword } = req.body;
    // Busca-se o usuario atraves da primary key com o dado do req.userId
    const user = await User.findByPk(req.userId);
    // Verificação de que se o email que esta se querendo alterar e diferente do email existente
    if (email !== user.email) {
      // findOne = tentar encontrar um usuario conforme a serie de regras de condicionais
      const userExists = await User.findOne({ where: { email } });
      // Se existir retorna nulo ignorando o if
      if (userExists) {
        // Se existir usuario, bloqueia-se o fluxo dando um return e retornado mensagem de erro
        return res.status(400).json({ error: 'User already exists.' });
      }
    }
    // Verificação se o oldpassword bate com a senha atual
    // Só verificamos se as senhas batem se o usurio informar a senha antiga
    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      // Sea a password estiver errada retorna mensagem de erro
      return res.status(401).json({ error: 'Password does not match' });
    }
    // Se tudo der certo, atualiza-se as informações com os dados do req.body
    const { id, name, provider } = await user.update(req.body);
    // Envia as informaç~çoes atualizadas
    return res.json({
      id,
      name,
      email,
      provider,
    });
  }
}

// Exportar por padrão new UserController
export default new UserController();
