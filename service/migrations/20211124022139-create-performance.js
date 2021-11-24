// 'use strict';
// import { DataTypes } from 'sequelize';
const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Performances', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      sourceId: { type: DataTypes.INTEGER, require: true },
      date: { type: DataTypes.DATEONLY, require: true },
      clicks: { type: DataTypes.INTEGER, default: null },
      commissionTotal: { type: DataTypes.INTEGER, default: null },
      conversionRate: { type: DataTypes.INTEGER, default: null },
      earningsPerClick: { type: DataTypes.INTEGER, default: null },
      impressions: { type: DataTypes.INTEGER, default: null },
      leadsNet: { type: DataTypes.INTEGER, default: null },
      salesNet: { type: DataTypes.INTEGER, default: null },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Performances');
  }
};