import { assetFromString } from '@thorchain/asgardex-util';
import { MidgardAssetPool, AssetPool } from 'midgard/asset-pools';

export function transform(data: MidgardAssetPool): AssetPool {
  return {
    ...data,
    asset: assetFromString(data.asset),
  };
}
