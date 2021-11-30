import Application from './Application';
import Config from "./Config";
import Database from "./Database";
import WebClient from "./WebClient";
import Logger from "./Logger";

const logger = new Logger();
const config = new Config();
const database = new Database(config, logger);
const apiClient = new WebClient(config, logger);

const app = new Application(database, config, apiClient, logger);

app.run().then(async () => {
  await database.close();
  logger.log('Exit to console...');
  process.exit();
});
