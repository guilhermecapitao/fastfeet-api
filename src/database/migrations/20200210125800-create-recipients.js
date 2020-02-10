module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('recipients', {
      id: {
        type: Sequelize.INTEGER,
        AllowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        AllowNull: false
      },
      street: {
        type: Sequelize.STRING,
        AllowNull: false
      },
      house_number: {
        type: Sequelize.STRING,
        AllowNull: false
      },
      complement: {
        type: Sequelize.STRING,
        AllowNull: true
      },
      state: {
        type: Sequelize.STRING,
        AllowNull: false
      },
      city: {
        type: Sequelize.STRING,
        AllowNull: false
      },
      zip_code: {
        type: Sequelize.STRING,
        AllowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        AllowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        AllowNull: false
      }
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('recipients');
  }
};
