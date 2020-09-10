import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import { Stats } from '../generated/graphql';
import { MidgardAssetPool } from '../types/midgard/asset-pools';
import logger from '../utils/logger';
import config from 'config';
import { MidgardTransactions } from 'midgard/transactions';

type MidgardSettings = {
  hostname: string;
  paths: {
    stats: string;
    pools: string;
    poolsDetail: string;
    transactions: string;
  };
};

export default class MidgardAPI extends RESTDataSource {
  settings: MidgardSettings = config.get('services.midgard');
  baseURL = this.settings.hostname;

  async getStats(): Promise<Stats> {
    return await this.get(this.settings.paths.stats);
  }

  async getPools(): Promise<Array<string>> {
    return await this.get(this.settings.paths.pools);
  }

  async getAssetPools(asset: string): Promise<Array<MidgardAssetPool>> {
    return await this.get(this.settings.paths.poolsDetail, { asset });
  }

  async getTransactions({ limit, offset }: { limit: number; offset: number }): Promise<MidgardTransactions> {
    return await this.get(this.settings.paths.transactions, { limit, offset });
  }

  willSendRequest({ method, path, params }: RequestOptions): void {
    logger.info({ method, path, params: params.toString() });
  }
}
