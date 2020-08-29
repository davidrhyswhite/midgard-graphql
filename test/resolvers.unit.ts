import resolvers from '../src/resolvers';
import { Context } from '../src/types/context';

const context = ({
  dataSources: {
    midgardAPI: {
      getStats: jest.fn(() => 'getStats'),
    },
  },
} as unknown) as Context;

test('Query.stats calls MidgardAPI.getStats method and returns', () => {
  // @ts-ignore
  const value = resolvers.Query.stats(null, null, context);
  expect(context.dataSources.midgardAPI.getStats).toBeCalledTimes(1);
  expect(value).toBe('getStats');
});
