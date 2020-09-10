import { UserInputError } from 'apollo-server';
import resolvers from '../src/resolvers';
import { Context } from '../src/types/context';
import { transform as assetPoolTransform } from '../src/transformers/asset-pool';
import { transform as transactionsTransform } from '../src/transformers/transactions';

jest.mock('../src/transformers/asset-pool', () => ({
  transform: jest.fn(() => 'asset-pool.transform'),
}));

jest.mock('../src/transformers/transactions', () => ({
  transform: jest.fn(() => 'transactions.transform'),
}));

const getStatsSpy = jest.fn().mockResolvedValue('getStats');
const getAssetPoolsSpy = jest.fn().mockResolvedValue(['getAssetPools']);
const getPoolsSpy = jest.fn().mockResolvedValue(['asset']);
const getTransactionsSpy = jest.fn().mockResolvedValue({ txs: ['getTransactions'] });

const context = ({
  dataSources: {
    midgardAPI: {
      getStats: getStatsSpy,
      getAssetPools: getAssetPoolsSpy,
      getPools: getPoolsSpy,
      getTransactions: getTransactionsSpy,
    },
  },
} as unknown) as Context;

beforeEach(() => {
  jest.clearAllMocks();
});

const {
  Query: { pools, stats, transactions },
} = resolvers;

describe('Query.stats', () => {
  test('calls MidgardAPI.getStats method and returns', async () => {
    const value = await (stats as Function)(null, null, context);
    expect(context.dataSources.midgardAPI.getStats).toBeCalledTimes(1);
    expect(value).toBe('getStats');
  });
});

describe('Query.pools', () => {
  test('calls MidgardAPI.getPools method', async () => {
    await (pools as Function)(null, null, context);
    expect(context.dataSources.midgardAPI.getPools).toBeCalledTimes(1);
  });

  test('calls MidgardAPI.getAssetPools for each asset recieved from MidgardAPI.getPools', async () => {
    getPoolsSpy.mockResolvedValueOnce(['asset-1', 'asset-2']);
    await (pools as Function)(null, null, context);
    expect(getAssetPoolsSpy).toBeCalledTimes(2);
    expect(getAssetPoolsSpy).toBeCalledWith('asset-1');
    expect(getAssetPoolsSpy).toBeCalledWith('asset-2');
  });

  test('calls transform for each asset recieved from MidgardAPI.getAssetPools', async () => {
    getPoolsSpy.mockResolvedValueOnce(['asset-1', 'asset-2']);
    getAssetPoolsSpy.mockResolvedValueOnce(['asset-pool-1']).mockResolvedValueOnce(['asset-pool-2']);
    await (pools as Function)(null, null, context);
    expect(assetPoolTransform).toBeCalledTimes(2);
    expect(assetPoolTransform).toBeCalledWith('asset-pool-1', expect.any(Number), expect.any(Array));
    expect(assetPoolTransform).toBeCalledWith('asset-pool-2', expect.any(Number), expect.any(Array));
  });
});

describe('Query.transactions', () => {
  test('calls MidgardAPI.getTransactions method', async () => {
    await (transactions as Function)(null, { limit: 10, offset: 0 }, context);
    expect(context.dataSources.midgardAPI.getTransactions).toBeCalledTimes(1);
  });

  test('calls transform with response and passes the limit and offset', async () => {
    const response = { txs: ['getTransactions'] };
    await (transactions as Function)(null, { limit: 10, offset: 10 }, context);
    expect(transactionsTransform).toBeCalledTimes(1);
    expect(transactionsTransform).toBeCalledWith(response, { limit: 10, offset: 10 });
  });

  test('throws a UserInputError when limit is less than 1', async () => {
    expect.assertions(2);
    try {
      await (transactions as Function)(null, { limit: -1, offset: 0 }, context);
    } catch (error) {
      expect(error).toBeInstanceOf(UserInputError);
      expect(error).toHaveProperty('message', 'limit argument is less than 1 or greater than 50');
    }
  });

  test('throws a UserInputError when limit is more than 50', async () => {
    expect.assertions(2);
    try {
      await (transactions as Function)(null, { limit: 51, offset: 0 }, context);
    } catch (error) {
      expect(error).toBeInstanceOf(UserInputError);
      expect(error).toHaveProperty('message', 'limit argument is less than 1 or greater than 50');
    }
  });
});
