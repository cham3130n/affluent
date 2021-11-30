import { Op } from "sequelize";
import { WebPagePerformanceItem, IApplication, IConfig, IDatabase, ILogger } from './types';
import WebClient from "./WebClient";

export default class Application implements IApplication {
  private sourceId: number = 0;

  constructor(
    private readonly database: IDatabase,
    private readonly config: IConfig,
    private readonly webClient: WebClient,
    private readonly logger: ILogger,
  ) {
    this.sourceId = 11;
  };

  async run(): Promise<void> {
    await this.database.sync();

    const generator = this.webClient.getRecords();

    let webItems = await generator.next();
    while (webItems.value) {
      const itemIdList = webItems.value.map((row: WebPagePerformanceItem) => row.id);
      const records = await this.database.findAll('User', { extId: { [Op.in]: itemIdList } } );
      const exclude = records.map((row: any) => row.extId)

      const leftRecords = webItems.value
        .filter((row: WebPagePerformanceItem) => !exclude.includes(row.id))
        .map((row: WebPagePerformanceItem) => ({
          sourceId: this.sourceId,
          date: row.date,
          clicks: row.clicks,
          commissionTotal: row.commissionTotal,
          conversionRate: row.conversionRate,
          earningsPerClick: row.earningsPerClick,
          impressions: row.impressions,
          leadsNet: row.leadsNet,
          salesNet: row.salesNet,
        }));

      await this.database.bulkCreate('Performance', leftRecords, true);

      this.logger.log('Found new records:', leftRecords.length, 'of', itemIdList.length);

      webItems = await generator.next();
    }

    return Promise.resolve();
  }
}