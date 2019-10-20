module.exports = {
  // Metodo up, que é quando a migration for executada
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('appointments', {
      // Neste segundo objeto vai ser definido os campos da tabela
      // Passado objeto para as colunas, devido ter que passar configurações a mais
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        // Inserir uma chave estrangeira (references). model referencia a tabela files
        // Ou seja todo avatar_id da tabela users vai ser um id contido na tabela files
        references: { model: 'users', key: 'id' },
        // Se for atualizado, a atualização tambem sera feita na tabela de usuarios
        onUpdate: 'CASCADE',
        // Se for deletado na tabela de files, também sera deletado em usuarios
        onDelete: 'SET NULL',
        allowNull: true,
      },
      provider_id: {
        type: Sequelize.INTEGER,
        // Inserir uma chave estrangeira (references). model referencia a tabela files
        // Ou seja todo avatar_id da tabela users vai ser um id contido na tabela files
        references: { model: 'users', key: 'id' },
        // Se for atualizado, a atualização tambem sera feita na tabela de usuarios
        onUpdate: 'CASCADE',
        // Se for deletado na tabela de files, também sera deletado em usuarios
        onDelete: 'SET NULL',
        allowNull: true,
      },
      canceled_at: {
        type: Sequelize.DATE,
      },
      // O sequelize vai preencher estes dois campos automaticamente
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  // Metodo down, se for fazer o rollback, já esta configurado
  // Removido o sequelize, que não vai ser usado no metodo down
  // _down: (queryInterface, Sequelize) => {
  down: queryInterface => {
    return queryInterface.dropTable('appointments');
  },
};
