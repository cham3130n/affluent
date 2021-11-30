import { Sequelize, DataTypes, Model } from 'sequelize';

const fields = {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, default: 1 },
  sourceId: { type: DataTypes.INTEGER },
  extId: { type: DataTypes.INTEGER },
  avatar: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING },
  firstName: { type: DataTypes.STRING },
  lastName: { type: DataTypes.STRING },
};

const options = {};

export class User extends Model {}

export async function init(sequelize: Sequelize) {
  User.init(fields, { ...options, sequelize });
}