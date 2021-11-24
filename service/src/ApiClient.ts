import axios, { AxiosRequestConfig } from "axios";
import { ApiUserItem, IApiClient, IConfig, ILogger } from './types';

export default class ApiClient implements IApiClient{
  constructor(
    private readonly config: IConfig,
    private readonly logger: ILogger,
  ) {}

  async * getRecords(): AsyncGenerator<ApiUserItem[] | null | any | unknown> {
    let currentPage = 1;
    let maxPage = 0;

    while (currentPage === 1 || currentPage <= maxPage) {
      const response = await this.request('GET', `/api/users?page=${currentPage}`);

      if (!response) {
        await new Promise((resolve) => { setTimeout(resolve, 1000); });
        continue;
      }

      maxPage = response.data.total_pages;

      this.logger.log('Parsing page', currentPage, 'of', maxPage);

      yield response.data?.data;

      currentPage += 1;
    }

    yield null;
  }

  private async request(method: string, url: string, data?: any) {
    return axios(<AxiosRequestConfig>{
      url,
      method,
      baseURL: this.config.get('API_URL'),
      data: data ? JSON.stringify(data) : undefined,
    });
  }
}