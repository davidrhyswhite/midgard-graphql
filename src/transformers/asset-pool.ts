import { assetFromString } from '@thorchain/asgardex-util';
import { AssetPoolInput, AssetPool } from 'midgard/asset-pools';

export function transform(data: AssetPoolInput): AssetPool {
  return {
    ...data,
    asset: assetFromString(data.asset),
  };
}
