import Application from './Application';
import Config from "./Config";
import Database from "./Database";
import ApiClient from "./ApiClient";
import Logger from "./Logger";

const logger = new Logger();
const config = new Config();
const database = new Database(config, logger);
const apiClient = new ApiClient(config, logger);

const app = new Application(database, config, apiClient, logger);

app.run().then(async () => {
  await database.close();
  logger.log('Exit to console...');
});
