import { Model, Sequelize } from 'sequelize';

import { IConfig, IDatabase, ILogger, MySQL } from './types';
import initModels from './mariadbModels';

const MYSQL_DIALECT = 'postgres';
const fallback = { host: 'localhost', database: MySQL.database, user: 'user', password: 'password' };

export default class MariadbDatabase implements IDatabase {
  private readonly sequelize: Sequelize;

  private readonly models: { [name: string]: any } = {};

  constructor(
    private readonly config: IConfig,
    private readonly logger: ILogger,
  ) {
    this.sequelize = new Sequelize(
      config.get(MySQL.database) || fallback.database,
      config.get(MySQL.user) || fallback.user,
      config.get(MySQL.password) || fallback.password,
      {
        host: config.get(MySQL.host),
        dialect: MYSQL_DIALECT,
        port: 5432,
        define: { underscored: false },
        logging: false,
      },
    );

    this.models = initModels(this.sequelize);

    this.logger.log('Initialized models:', Object.keys(this.models));
  }

  async sync(): Promise<Sequelize> {
    return this.sequelize.sync();
  }

  async close(): Promise<void> {
    return this.sequelize.close();
  }

  async bulkCreate(modelName: string, fields: { [name: string]: any }[], validate?: boolean): Promise<Model[]> {
    return this.models[modelName].bulkCreate(fields, { validate });
  }

  async create(modelName: string, fields: { [name: string]: any }): Promise<Model> {
    return new this.models[modelName](fields);
  }

  async findOne(modelName: string, condition?: any): Promise<Model> {
    return this.models[modelName].findOne(condition ? { where: condition } : undefined);
  }

  async findAll(modelName: string, condition?: any): Promise<Model[]> {
    return this.models[modelName].findAll(condition ? { where: condition } : undefined);
  }
}
