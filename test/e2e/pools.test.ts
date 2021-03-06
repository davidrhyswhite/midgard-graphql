import { createTestClient } from 'apollo-server-testing';
import { ApolloServer } from 'apollo-server';
import nock from 'nock';
import { AssetPoolStatus } from '../../src/generated/graphql';
import { createPoolsDetail } from '../helpers/mock-creators';
import { createServer } from '../../src/app';
import { importQuery } from '../helpers/import-query';

const POOLS_QUERY = importQuery('pools.graphql');

test('returns an AssetPool type from application', async () => {
  const { query } = createTestClient(createServer(ApolloServer));

  nock('http://midgard.hostname.local').get('/pools/path').reply(200, ['AAA.BBB-CCC', 'DDD.EEE-FFF']);

  nock('http://midgard.hostname.local')
    .get('/pools/detail/path')
    .query({ asset: 'AAA.BBB-CCC' })
    .reply(200, createPoolsDetail({ asset: 'AAA.BBB-CCC', status: AssetPoolStatus.Enabled }));

  nock('http://midgard.hostname.local')
    .get('/pools/detail/path')
    .query({ asset: 'DDD.EEE-FFF' })
    .reply(200, createPoolsDetail({ asset: 'DDD.EEE-FFF', status: AssetPoolStatus.Disabled }));

  // run query against the server and snapshot the output
  const res = await query({ query: POOLS_QUERY });
  expect(res).toMatchSnapshot();
});
