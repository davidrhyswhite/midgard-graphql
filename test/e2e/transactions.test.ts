import { createTestClient } from 'apollo-server-testing';
import { ApolloServer } from 'apollo-server';
import nock from 'nock';
import { createTransactions } from '../helpers/mock-creators';
import { createServer } from '../../src/app';
import { importQuery } from '../helpers/import-query';

const TRANSACTIONS_QUERY = importQuery('transactions.graphql');

test('returns an TransactionConnection type from application', async () => {
  const { query } = createTestClient(createServer(ApolloServer));

  nock('http://midgard.hostname.local')
    .get('/transactions/path')
    .query({ limit: 20, offset: 0 })
    .reply(200, createTransactions());

  // run query against the server and snapshot the output
  const res = await query({ query: TRANSACTIONS_QUERY, variables: { limit: 20, offset: 0 } });
  expect(res).toMatchSnapshot();
});
