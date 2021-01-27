'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      image: {
        allowNull: false,
        defaultValue: "https://res.cloudinary.com/zoehyh/image/upload/v1611438077/zoehyh_blog/20200315%E5%90%91%E9%99%BD%E8%8A%B1%E8%8D%89_an4hf8.jpg",
        type: Sequelize.STRING,
        validate: { isUrl: true }
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      body: {
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
      },
      deletedAt: {
        type: Sequelize.DATE
      },
      CategoryId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        validate: { isInt: true }
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Posts');
  }
};