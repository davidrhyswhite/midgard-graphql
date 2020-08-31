import { MidgardAssetPool } from '../../../src/types/midgard/asset-pools';
import { Stats } from '../../../src/types/midgard/stats';

export const createStats = (): Stats => ({
  dailyActiveUsers: 'dailyActiveUsers',
  dailyTx: 'dailyTx',
  monthlyActiveUsers: 'monthlyActiveUsers',
  monthlyTx: 'monthlyTx',
  poolCount: 'poolCount',
  totalAssetBuys: 'totalAssetBuys',
  totalAssetSells: 'totalAssetSells',
  totalDepth: 'totalDepth',
  totalEarned: 'totalEarned',
  totalStakeTx: 'totalStakeTx',
  totalStaked: 'totalStaked',
  totalTx: 'totalTx',
  totalUsers: 'totalUsers',
  totalVolume: 'totalVolume',
  totalVolume24hr: 'totalVolume24hr',
  totalWithdrawTx: 'totalWithdrawTx',
});

export const createPoolsDetail = ({ asset, status }: { asset?: string; status?: string } = {}): Array<
  MidgardAssetPool
> => [
  {
    asset: asset || 'AAA.BBB-CCC',
    status: status || 'enabled',
    price: 'price',
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
  },
];
