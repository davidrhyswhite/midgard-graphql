import { createTestClient } from 'apollo-server-testing';
import { ApolloServer } from 'apollo-server';
import gql from 'graphql-tag';
import nock from 'nock';
import { createStats } from '../helpers/mock-creators';
import { createServer } from '../../src/app';

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
  const { query } = createTestClient(createServer(ApolloServer));

  nock('http://midgard.hostname.local').get('/stats/path').reply(200, createStats());

  // run query against the server and snapshot the output
  const res = await query({ query: GET_STATS });
  expect(res).toMatchSnapshot();
});
