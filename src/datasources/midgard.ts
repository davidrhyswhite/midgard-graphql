import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import { Stats } from '../types/midgard/stats';
import { AssetPool, AssetPoolInput } from '../types/midgard/asset-pools';
import { transform as assetPoolTransformer } from '../transformers/asset-pool';
import logger from '../utils/logger';
import config from 'config';

type MidgardSettings = {
  hostname: string;
  paths: {
    stats: string;
    pools: string;
    poolsDetail: string;
  };
};

export default class MidgardAPI extends RESTDataSource {
  settings: MidgardSettings = config.get('services.midgard');
  baseURL = this.settings.hostname;

  async getStats(): Promise<Stats> {
    return await this.get(this.settings.paths.stats);
  }

  public async getAssetPools(): Promise<Array<AssetPool>> {
    const pools = await this.getPools();

    const assets = await Promise.all(
      pools.map(async (asset: string) => {
        const response: Array<AssetPoolInput> = await this.get(this.settings.paths.poolsDetail, { asset });

        return response.map(assetPoolTransformer);
      }),
    );

    return assets.flat();
  }

  private async getPools(): Promise<Array<string>> {
    return await this.get(this.settings.paths.pools);
  }

  willSendRequest({ method, path, params }: RequestOptions): void {
    logger.info({ method, path, params: params.toString() });
  }
}
