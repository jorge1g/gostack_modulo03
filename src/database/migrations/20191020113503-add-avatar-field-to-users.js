module.exports = {
  up: (queryInterface, Sequelize) => {
    // Retornar a adição de uma coluna na tabela users com o nome avatar_id
    return queryInterface.addColumn('users', 'avatar_id', {
      // Inserir informações da coluna
      type: Sequelize.INTEGER,
      // Inserir uma chave estrangeira (references). model referencia a tabela files
      // Ou seja todo avatar_id da tabela users vai ser um id contido na tabela files
      references: { model: 'files', key: 'id' },
      // Se for atualizado, a atualização tambem sera feita na tabela de usuarios
      onUpdate: 'CASCADE',
      // Se for deletado na tabela de files, também sera deletado em usuarios
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('users', 'avatar_id');
  },
};
