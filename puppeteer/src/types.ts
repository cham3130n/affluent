import { Sequelize, Model } from 'sequelize';

export interface IConfig {
  get(name: string): string | undefined;
}

export interface IApplication {
  run(): void;
}

export interface IDatabase {
  bulkCreate(modelName: string, fields: any[], validate?: boolean):Promise<Model[]>;
  create(modelName: string, fields: any): Promise<Model>;
  findOne(modelName: string, condition?: any): Promise<Model>;
  findAll(modelName: string, condition?: any): Promise<Model[]>;
  sync(): Promise<Sequelize>;
  close(): Promise<void>;
}

export interface IWebClient {
  getRecords(): WebPagePerformanceItem[] | null | any | unknown;
}

export interface ILogger {
  log(...message: Array<any>): void;
}

export type EnvVars = { [name: string]: string; }

export enum MySQL {
  host = 'PG_HOST',
  user = 'PG_USER',
  password = 'PG_PASSWORD',
  database = 'PG_DATABASE',
}

export enum WebPage {
  url = 'WEB_PAGE_URL',
  username = 'WEB_PAGE_USERNAME',
  password = 'WEB_PAGE_PASSWORD',
}

export type WebPagePerformanceItem = {
  id: number,
  date: Date,
  clicks: number,
  commissionTotal: number,
  conversionRate: number,
  earningsPerClick: number,
  impressions: number,
  leadsNet: number,
  salesNet: number,
}
