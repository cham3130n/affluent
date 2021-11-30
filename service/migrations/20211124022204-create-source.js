// 'use strict';
// import { DataTypes } from 'sequelize';
const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Sources', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      description: { type: DataTypes.STRING },
      parser: { type: DataTypes.STRING },
      url: { type: DataTypes.STRING },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });

    const now = new Date();

    await queryInterface.bulkInsert('Sources', [
      {
        description: 'Reads User data from Affluent API via direct requests',
        parser: 'apiReader',
        url: 'https://reqres.in',
        createdAt: now,
        updatedAt: now,
      },
      {
        description: 'Crawls Performance data from web site via Puppeteer',
        parser: 'puppeteer',
        url: 'https://develop.pub.afflu.net',
        createdAt: now,
        updatedAt: now,
      },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Sources');
  }
};