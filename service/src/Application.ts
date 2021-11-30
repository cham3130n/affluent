import { Op } from "sequelize";
import { ApiUserItem, IApplication, IConfig, IDatabase, ILogger } from './types';
import ApiClient from "./ApiClient";

export default class Application implements IApplication {
  private sourceId: number = 0;

  constructor(
    private readonly database: IDatabase,
    private readonly config: IConfig,
    private readonly api: ApiClient,
    private readonly logger: ILogger,
  ) {
  };

  async run(): Promise<void> {
    await this.database.sync();

    const sourceRecord = await this.database.findOne('Source', { parser: ApiClient.getParserName() });

    if (!sourceRecord) {
      throw new Error('Source record for apiClient was not found, use migrations first.');
    }

    this.sourceId = <number>sourceRecord.get('id');
    const generator = this.api.getRecords();

    let apiItems = await generator.next();
    while (apiItems.value) {
      const itemIdList = apiItems.value.map((row: ApiUserItem) => row.id);
      const records = await this.database.findAll('User', { extId: { [Op.in]: itemIdList } } );
      const exclude = records.map((row: any) => row.extId)

      const leftRecords = apiItems.value
        .filter((row: ApiUserItem) => !exclude.includes(row.id))
        .map((row: ApiUserItem) => ({
          sourceId: this.sourceId,
          extId: row.id,
          email: row.email,
          firstName: row.first_name,
          lastName: row.last_name,
        }));

      await this.database.bulkCreate('User', leftRecords, true);

      this.logger.log('Found new records:', leftRecords.length, 'of', itemIdList.length);

      apiItems = await generator.next();
    }

    return Promise.resolve();
  }
}