import { Sequelize, DataTypes, Model } from 'sequelize';

const fields = {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, default: 1 },
  description: { type: DataTypes.STRING },
  parser: { type: DataTypes.STRING },
  url: { type: DataTypes.STRING },
};

const options = {};

export class Source extends Model {}

export async function init(sequelize: Sequelize) {
  Source.init(fields, { ...options, sequelize });
}