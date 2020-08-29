import { createTestClient } from 'apollo-server-testing';
import gql from 'graphql-tag';
import nock from 'nock';
import app from '../../src/app';

const GET_STATS = gql`
  query getStats {
    stats {
      dailyActiveUsers
      monthlyActiveUsers
      totalUsers
      dailyTx
      monthlyTx
      totalTx
      totalVolume24hr
      totalVolume
      totalStaked
      totalDepth
      totalEarned
      poolCount
      totalAssetBuys
      totalAssetSells
      totalStakeTx
      totalWithdrawTx
    }
  }
`;

test('returns a stats type from application', async () => {
  const { query } = createTestClient(app);

  nock('http://midgard.hostname.local').get('/stats/path').reply(200, {
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

  // run query against the server and snapshot the output
  const res = await query({ query: GET_STATS });
  expect(res).toMatchSnapshot();
});
