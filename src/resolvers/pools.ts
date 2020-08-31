import { Context } from '../types/context';
import { AssetPool, MidgardAssetPool } from '../types/midgard/asset-pools';
import { transform as assetPoolTransformer } from '../transformers/asset-pool';
export const pools = async (_: void, __: void, { dataSources: { midgardAPI } }: Context): Promise<Array<AssetPool>> => {
  const pools = await midgardAPI.getPools();

  const assets = await Promise.all(
    pools.map(async (asset: string) => {
      const assetPools: Array<MidgardAssetPool> = await midgardAPI.getAssetPools(asset);

      return assetPools.map(assetPoolTransformer);
    }),
  );

  return assets.flat();
};
