import nock from 'nock';
import { createStats, createPoolsDetail } from '../helpers/mock-creators';
import MidgardAPI from '../../src/datasources/midgard';
import { Stats } from '../../src/types/midgard/stats';
import { MidgardAssetPool } from '../../src/types/midgard/asset-pools';

test('getStats makes HTTP request to /stats/path and returns object', async () => {
  const stats = createStats();
  nock('http://midgard.hostname.local').get('/stats/path').reply(200, stats);

  const midgard = new MidgardAPI();
  midgard.initialize({ context: {}, cache: undefined });

  const getStatsValue: Stats = await midgard.getStats();

  expect(getStatsValue).toStrictEqual(stats);
});

test('getPools makes HTTP request to /pools/path and returns object', async () => {
  const pools = ['AAA.BBB-CCC'];
  nock('http://midgard.hostname.local').get('/pools/path').reply(200, pools);

  const midgard = new MidgardAPI();
  midgard.initialize({ context: {}, cache: undefined });

  const getPoolsValue = await midgard.getPools();

  expect(getPoolsValue).toStrictEqual(pools);
});

test('getAssetPools makes HTTP request to /pools/detail/path and returns object', async () => {
  const poolsDetail = createPoolsDetail();
  nock('http://midgard.hostname.local').get('/pools/detail/path').query({ asset: 'asset' }).reply(200, poolsDetail);

  const midgard = new MidgardAPI();
  midgard.initialize({ context: {}, cache: undefined });

  const getAssetPoolsValue: Array<MidgardAssetPool> = await midgard.getAssetPools('asset');

  expect(getAssetPoolsValue).toStrictEqual(poolsDetail);
});

test('getTransactions makes HTTP request to /transactions/path and returns object', async () => {
  const poolsDetail = createPoolsDetail();
  nock('http://midgard.hostname.local')
    .get('/transactions/path')
    .query({ limit: 10, offset: 20 })
    .reply(200, poolsDetail);

  const midgard = new MidgardAPI();
  midgard.initialize({ context: {}, cache: undefined });

  const getTransactionsValue = await midgard.getTransactions({ limit: 10, offset: 20 });

  expect(getTransactionsValue).toStrictEqual(poolsDetail);
});
