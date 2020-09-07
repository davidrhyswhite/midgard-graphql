import { createTestClient } from 'apollo-server-testing';
import gql from 'graphql-tag';
import nock from 'nock';
import { createPoolsDetail } from '../helpers/mock-creators';
import app from '../../src/app';

const GET_POOLS = gql`
  query getPools {
    pools {
      status
      asset {
        chain
        symbol
        ticker
      }
      price
    }
  }
`;

test('returns an AssetPool type from application', async () => {
  const { query } = createTestClient(app);

  nock('http://midgard.hostname.local').get('/pools/path').reply(200, ['AAA.BBB-CCC', 'DDD.EEE-FFF']);

  nock('http://midgard.hostname.local')
    .get('/pools/detail/path')
    .query({ asset: 'AAA.BBB-CCC' })
    .reply(200, createPoolsDetail({ asset: 'AAA.BBB-CCC', status: 'enabled' }));

  nock('http://midgard.hostname.local')
    .get('/pools/detail/path')
    .query({ asset: 'DDD.EEE-FFF' })
    .reply(200, createPoolsDetail({ asset: 'DDD.EEE-FFF', status: 'disabled' }));

  // run query against the server and snapshot the output
  const res = await query({ query: GET_POOLS });
  expect(res).toMatchSnapshot();
});
