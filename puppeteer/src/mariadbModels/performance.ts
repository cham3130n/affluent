import { Sequelize, DataTypes, Model } from 'sequelize';

const fields = {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, default: 1 },
  sourceId: { type: DataTypes.INTEGER, require: true },
  date: { type: DataTypes.DATEONLY, require: true },
  clicks: { type: DataTypes.INTEGER, default: null },
  commissionTotal: { type: DataTypes.INTEGER, default: null },
  conversionRate: { type: DataTypes.INTEGER, default: null },
  earningsPerClick: { type: DataTypes.INTEGER, default: null },
  impressions: { type: DataTypes.INTEGER, default: null },
  leadsNet: { type: DataTypes.INTEGER, default: null },
  salesNet: { type: DataTypes.INTEGER, default: null },
};

const options = {};

export class Performance extends Model {}

export async function init(sequelize: Sequelize) {
  Performance.init(fields, { ...options, sequelize });
}