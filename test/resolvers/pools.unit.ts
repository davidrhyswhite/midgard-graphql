import { pools } from '../../src/resolvers/pools';
import { Context } from '../../src/types/context';
import { transform } from '../../src/transformers/asset-pool';

jest.mock('../../src/transformers/asset-pool', () => ({
  transform: jest.fn(() => 'asset-pool.transform'),
}));

const getAssetPoolsSpy = jest.fn().mockResolvedValue(['getAssetPools']);
const getPoolsSpy = jest.fn().mockResolvedValue(['asset']);

const context = ({
  dataSources: {
    midgardAPI: {
      getAssetPools: getAssetPoolsSpy,
      getPools: getPoolsSpy,
    },
  },
} as unknown) as Context;

beforeEach(() => {
  jest.clearAllMocks();
});

test('pools resolver calls MidgardAPI.getPools method', async () => {
  await pools(null, null, context);
  expect(context.dataSources.midgardAPI.getPools).toBeCalledTimes(1);
});

test('pools resolver calls MidgardAPI.getAssetPools for each asset recieved from MidgardAPI.getPools', async () => {
  getPoolsSpy.mockResolvedValueOnce(['asset-1', 'asset-2']);
  await pools(null, null, context);
  expect(getAssetPoolsSpy).toBeCalledTimes(2);
  expect(getAssetPoolsSpy).toBeCalledWith('asset-1');
  expect(getAssetPoolsSpy).toBeCalledWith('asset-2');
});

test('pools resolver calls transform for each asset recieved from MidgardAPI.getAssetPools', async () => {
  getPoolsSpy.mockResolvedValueOnce(['asset-1', 'asset-2']);
  getAssetPoolsSpy.mockResolvedValueOnce(['asset-pool-1']).mockResolvedValueOnce(['asset-pool-2']);
  await pools(null, null, context);
  expect(transform).toBeCalledTimes(2);
  expect(transform).toBeCalledWith('asset-pool-1', expect.any(Number), expect.any(Array));
  expect(transform).toBeCalledWith('asset-pool-2', expect.any(Number), expect.any(Array));
});
