import { assetFromString } from '@thorchain/asgardex-util';
import { MidgardAssetPool } from 'midgard/asset-pools';
import { AssetPool } from '../generated/graphql';

export function transform(data: MidgardAssetPool): AssetPool {
  return {
    ...data,
    asset: assetFromString(data.asset),
  };
}
