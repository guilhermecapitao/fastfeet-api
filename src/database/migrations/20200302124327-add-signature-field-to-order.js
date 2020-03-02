module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('files', 'order_id', {
      type: Sequelize.INTEGER,
      references: { model: 'orders', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('files', 'order_id');
  }
};
