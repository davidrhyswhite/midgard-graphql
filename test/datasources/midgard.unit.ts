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
