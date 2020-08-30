import nock from 'nock';
import MidgardAPI from '../../src/datasources/midgard';

const statsObject = {
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
};

test('getStats makes HTTP request to /v1/stats and returns object', async () => {
  nock('http://midgard.hostname.local').get('/stats/path').reply(200, statsObject);
  const midgard = new MidgardAPI();
  midgard.initialize({ context: {}, cache: undefined });

  const getStatsValue = await midgard.getStats();

  expect(getStatsValue).toStrictEqual(statsObject);
});
