import { Sequelize } from "sequelize";
import { Performance, init as initPerformance } from './performance';
import { Source, init as initSource } from './source'
import { User, init as initUser } from './user'

export default (sequelize: Sequelize) => {
  Promise.all([
    initPerformance(sequelize),
    initSource(sequelize),
    initUser(sequelize),
  ]).catch((err) => {
    // eslint-disable-next-line no-console
    console.log(err);
  });

  return {
    Performance,
    Source,
    User,
  };
};
