import puppeteer from "puppeteer/lib/cjs/puppeteer/node-puppeteer-core";

import { WebPagePerformanceItem, IConfig, ILogger, IWebClient, WebPage } from './types';

export default class WebClient implements IWebClient{
  webPage: string;

  username: string;

  password: string;

  constructor(
    private readonly config: IConfig,
    private readonly logger: ILogger,
  ) {
    this.webPage = this.config.get(WebPage.url) || '';
    this.username = this.config.get(WebPage.username) || '';
    this.password = this.config.get(WebPage.password) || '';
  }

  async * getRecords(): AsyncGenerator<WebPagePerformanceItem[] | null | any | unknown> {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--headless'],
    });
    const page = await browser.newPage();

    this.logger.log('Surfing to ', this.webPage);

    await page.goto(this.webPage, { waitUntil: 'networkidle0' });

    this.logger.log('Page loaded:', await page.title());
    this.logger.log('Filling in credentials...');

    await page.type('input[name="username"]', this.username);
    await page.type('input[name="password"]', this.password);
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