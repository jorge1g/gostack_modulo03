require('dotenv/config');

// Exporta arquivos de configuração (Objeto)
// Este arquivo vai ser aceesado pela aplicação e pelo sequelize sli
module.exports = {
  // Configurar credenciais que são encontrados na base de dados
  dialect: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  // Passando funcionalidades a mais
  define: {
    // Garantir colunas create app e update app dentro de cada tabela do BD
    timestamps: true,
    // Configurando no sequelize a utilização de nomenclatura de tabelas e colunas no padrão underscore
    underscored: true,
    underscoredAll: true,
  },
};
