'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      // id: {
      //   type: Sequelize.INTEGER
      // },
      firstname: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      lastname: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      mail: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      mdp: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};