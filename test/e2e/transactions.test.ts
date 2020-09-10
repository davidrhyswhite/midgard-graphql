import { createTestClient } from 'apollo-server-testing';
import { ApolloServer } from 'apollo-server';
import gql from 'graphql-tag';
import nock from 'nock';
import { createTransactions } from '../helpers/mock-creators';
import { createServer } from '../../src/app';

const GET_TRANSACTIONS = gql`
  fragment transaction on Transaction {
    txID
    address
  }
  query getTransactions {
    transactions(limit: 20, offset: 0) {
      totalCount
      nodes {
        type
        in {
          ...transaction
        }
        out {
          ...transaction
        }
      }
      pageInfo {
        nextCursor
        endCursor
        hasNextPage
      }
    }
  }
`;

test('returns an TransactionConnection type from application', async () => {
  const { query } = createTestClient(createServer(ApolloServer));

  nock('http://midgard.hostname.local')
    .get('/transactions/path')
    .query({ limit: 20, offset: 0 })
    .reply(200, createTransactions());

  // run query against the server and snapshot the output
  const res = await query({ query: GET_TRANSACTIONS });
  expect(res).toMatchSnapshot();
});
