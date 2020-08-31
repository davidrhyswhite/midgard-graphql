import MidgardAPI from '../../src/datasources/midgard';

const mockRestGet = jest.fn(() => 'mockRestGet');
jest.mock('apollo-datasource-rest', () => {
  class MockRESTDataSource {
    baseUrl = '';
    get = mockRestGet;
  }

  return {
    RESTDataSource: MockRESTDataSource,
  };
});

beforeEach(() => {
  jest.clearAllMocks();
});

test('sets baseURL to settings.hostname', async () => {
  const midgard = new MidgardAPI();

  expect(midgard.baseURL).toBe('http://midgard.hostname.local');
});

test('sets settings to config.services.midgard', async () => {
  const midgard = new MidgardAPI();

  expect(midgard.settings).toStrictEqual({
    hostname: 'http://midgard.hostname.local',
    paths: {
      stats: '/stats/path',
      pools: '/pools/path',
      poolsDetail: '/pools/detail/path',
    },
  });
});

test('getStats calls this.get with settings.paths.stats and returns value', async () => {
  const midgard = new MidgardAPI();
  const getStatsValue = await midgard.getStats();

  expect(mockRestGet).toBeCalledTimes(1);
  expect(mockRestGet).toBeCalledWith('/stats/path');
  expect(getStatsValue).toBe('mockRestGet');
});

test('getPools calls this.get with settings.paths.pools and returns value', async () => {
  const midgard = new MidgardAPI();
  const getPoolsValue = await midgard.getPools();

  expect(mockRestGet).toBeCalledTimes(1);
  expect(mockRestGet).toBeCalledWith('/pools/path');
  expect(getPoolsValue).toBe('mockRestGet');
});

test('getAssetPools calls this.get with settings.paths.poolsDetail and returns value', async () => {
  const midgard = new MidgardAPI();
  const getAssetPoolsValue = await midgard.getAssetPools('asset');

  expect(mockRestGet).toBeCalledTimes(1);
  expect(mockRestGet).toBeCalledWith('/pools/detail/path', { asset: 'asset' });
  expect(getAssetPoolsValue).toBe('mockRestGet');
});
