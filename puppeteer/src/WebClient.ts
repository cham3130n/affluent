import puppeteer from "puppeteer/lib/cjs/puppeteer/node-puppeteer-core";

import { WebPagePerformanceItem, IConfig, ILogger, IWebClient } from './types';

const webPage = 'https://develop.pub.afflu.net';
const username = 'developertest@affluent.io';
const password = 'Wn4F6g*N88EPiOyW';

export default class WebClient implements IWebClient{
  constructor(
    private readonly config: IConfig,
    private readonly logger: ILogger,
  ) {}

  async * getRecords(): AsyncGenerator<WebPagePerformanceItem[] | null | any | unknown> {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--headless'],
    });
    const page = await browser.newPage();

    this.logger.log('Surfing to ', webPage);

    await page.goto(webPage, { waitUntil: 'networkidle0' });

    this.logger.log('Page loaded:', await page.title());
    this.logger.log('Filling in credentials...');

    await page.type('input[name="username"]', username);
    await page.type('input[name="password"]', password);
    await page.click('button[type="submit"]');
    await page.waitForNavigation({ waitUntil: 'load' });

    this.logger.log('Page loaded:', await page.title());

    /**
     * Unfinished part since portal is under maintenance
     */

    this.logger.log('Finished surfing.');

    yield null;
  }
}