import { createTestClient } from 'apollo-server-testing';
import { ApolloServer } from 'apollo-server';
import nock from 'nock';
import { createStats } from '../helpers/mock-creators';
import { createServer } from '../../src/app';
import { importQuery } from '../helpers/import-query';

const STATS_QUERY = importQuery('stats.graphql');

test('returns a stats type from application', async () => {
  const { query } = createTestClient(createServer(ApolloServer));

  nock('http://midgard.hostname.local').get('/stats/path').reply(200, createStats());

  // run query against the server and snapshot the output
  const res = await query({ query: STATS_QUERY });
  expect(res).toMatchSnapshot();
});
