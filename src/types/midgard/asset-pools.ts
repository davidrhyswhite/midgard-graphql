import { Asset } from '@thorchain/asgardex-util';

type AssetPoolDefaults = {
  status: string;
  price: string;
  assetStakedTotal: string;
  runeStakedTotal: string;
  poolStakedTotal: string;
  assetDepth: string;
  runeDepth: string;
  poolDepth: string;
  poolUnits: string;
  sellVolume: string;
  buyVolume: string;
  poolVolume: string;
  poolVolume24hr: string;
  sellTxAverage: string;
  buyTxAverage: string;
  poolTxAverage: string;
  sellSlipAverage: string;
  buySlipAverage: string;
  poolSlipAverage: string;
  sellFeeAverage: string;
  buyFeeAverage: string;
  poolFeeAverage: string;
  sellFeesTotal: string;
  buyFeesTotal: string;
  poolFeesTotal: string;
  sellAssetCount: string;
  buyAssetCount: string;
  swappingTxCount: string;
  swappersCount: string;
  stakeTxCount: string;
  withdrawTxCount: string;
  stakingTxCount: string;
  stakersCount: string;
  assetROI: string;
  runeROI: string;
  poolROI: string;
  poolROI12: string;
};

export type AssetPoolInput = AssetPoolDefaults & {
  asset: string;
};

export type AssetPool = AssetPoolDefaults & {
  asset: Asset;
};
