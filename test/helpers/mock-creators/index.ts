import { MidgardAssetPool } from '../../../src/types/midgard/asset-pools';
import {
  MidgardTransactions,
  MidgardTx,
  MidgardSum,
  MidgardTransactionDetail,
} from '../../../src/types/midgard/transactions';
import { Stats, AssetPoolStatus, TransactionType, TransactionStatus } from '../../../src/generated/graphql';

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

export const createPoolsDetail = ({ asset, status }: { asset?: string; status?: AssetPoolStatus } = {}): Array<
  MidgardAssetPool
> => [
  {
    asset: asset || 'AAA.BBB-CCC',
    status: status || AssetPoolStatus.Enabled,
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
export const createMidgardSum = (): MidgardSum => ({
  asset: 'AAA.BBB-CCC',
  amount: 'amount',
});

export const createMidgardTx = (): MidgardTx => ({
  txID: 'txID',
  memo: 'memo',
  address: 'address',
  coins: [createMidgardSum()],
});

export const createTransactionDetail = (): MidgardTransactionDetail => ({
  pool: 'pool',
  type: TransactionType.Stake,
  status: TransactionStatus.Success,
  in: createMidgardTx(),
  out: [createMidgardTx()],
  date: 123456789,
  gas: createMidgardSum(),
  options: {
    priceTarget: 'priceTarget',
    withdrawBasisPoints: 'withdrawBasisPoints',
    asymmetry: 'asymmetry',
  },
  height: 'height',
  events: {
    fee: 'fee',
    stakeUnits: 'stakeUnits',
    slip: 'slip',
  },
});

export const createTransactions = (): MidgardTransactions => ({
  count: 1,
  txs: [createTransactionDetail()],
});
