// Importar model de dentro do sequelize
// Importar sequelize d dentro do sequelize
import Sequelize, { Model } from 'sequelize';
// Importando o bcryptjs, que acabou de ser instalado para entrada de password
import bcrypt from 'bcryptjs';
// Definir classe user extends model
class User extends Model {
  // Definir metodo extatico chamado init, vai receber sequelize como parametro
  // Vai ser chamado automaticamente pelo sequelize.
  static init(sequelize) {
    super.init(
      {
        // Primeiro parametro é um objeto contendo as colunas abaixo
        // Inserir somente colunas que serão usadas no cadastramento de novo usuario
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        // Criar novo campo virtual, que nunca vai existir na base de dados, so no lado do codigo
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
      },
      {
        // O sequelize recebido como parametro precisa ser passado dentro de um objeto
        // também como segundo parametro da super.init
        sequelize,
      }
    );
    // Depois do super.init inserir o addHook do sequelize
    // Neste caso antes de criar  ou editar um usuario o trecho de codigo seguinte vai ser executado de
    // forma automatica
    this.addHook('beforeSave', async user => {
      // Verificar se tem user.password, ou seja, ou é novo usario ou esta alterando usuario.
      // O hash de senha só vai ser gerado se for informado novo password para o usuario.
      if (user.password) {
        // Gerar user.password_hash usando o hash do bcrypt para criptografar com valor 8 de hash de criptografia
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });
    // Retornando o model que foi inicializado
    return this;
  }

  // Pode-se criar metodo novo dentro da classe
  // Criar metodo para verificação de password do usuario que esta tentando autenticar
  checkPassword(password) {
    // Usa-se o metodo compare do bcrypt para comparar as senhas inseridas e armazenadas
    // (O retorno é True ou False)
    return bcrypt.compare(password, this.password_hash);
  }
}
// Exporta usuario
export default User;
