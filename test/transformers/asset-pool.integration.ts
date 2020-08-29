import { AssetPoolInput, AssetPool } from '../../src/types/midgard/asset-pools';
import { transform } from '../../src/transformers/asset-pool';

const input: AssetPoolInput = {
  status: 'status',
  price: 'price',
  asset: 'AAA.BBB-CCC',
  assetStakedTotal: 'assetStakedTotal',
  runeStakedTotal: 'runeStakedTotal',
  poolStakedTotal: 'poolStakedTotal',
  assetDepth: 'assetDepth',
  runeDepth: 'runeDepth',
  poolDepth: 'poolDepth',
  poolUnits: 'poolUnits',
  sellVolume: 'sellVolume',
  buyVolume: 'buyVolume',
  poolVolume: 'poolVolume',
  poolVolume24hr: 'poolVolume24hr',
  sellTxAverage: 'sellTxAverage',
  buyTxAverage: 'buyTxAverage',
  poolTxAverage: 'poolTxAverage',
  sellSlipAverage: 'sellSlipAverage',
  buySlipAverage: 'buySlipAverage',
  poolSlipAverage: 'poolSlipAverage',
  sellFeeAverage: 'sellFeeAverage',
  buyFeeAverage: 'buyFeeAverage',
  poolFeeAverage: 'poolFeeAverage',
  sellFeesTotal: 'sellFeesTotal',
  buyFeesTotal: 'buyFeesTotal',
  poolFeesTotal: 'poolFeesTotal',
  sellAssetCount: 'sellAssetCount',
  buyAssetCount: 'buyAssetCount',
  swappingTxCount: 'swappingTxCount',
  swappersCount: 'swappersCount',
  stakeTxCount: 'stakeTxCount',
  withdrawTxCount: 'withdrawTxCount',
  stakingTxCount: 'stakingTxCount',
  stakersCount: 'stakersCount',
  assetROI: 'assetROI',
  runeROI: 'runeROI',
  poolROI: 'poolROI',
  poolROI12: 'poolROI12',
};

test('transforms AssetPoolInput to AssetPool', () => {
  const transformed: AssetPool = transform(input);

  expect(transformed).toStrictEqual({
    ...input,
    asset: {
      chain: 'AAA',
      ticker: 'BBB',
      symbol: 'BBB-CCC',
    },
  });
});
