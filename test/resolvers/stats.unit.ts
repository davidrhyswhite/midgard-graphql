import { stats } from '../../src/resolvers/stats';
import { Context } from '../../src/types/context';

const context = ({
  dataSources: {
    midgardAPI: {
      getStats: jest.fn(() => 'getStats'),
    },
  },
} as unknown) as Context;

test('stats resolver calls MidgardAPI.getStats method and returns', async () => {
  const value = await stats(null, null, context);
  expect(context.dataSources.midgardAPI.getStats).toBeCalledTimes(1);
  expect(value).toBe('getStats');
});
