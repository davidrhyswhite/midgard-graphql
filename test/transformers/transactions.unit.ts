import { transform } from '../../src/transformers/transactions';
import { toTransactionsDetail } from '../../src/transformers/helpers/transactions';
import { toPageInfo } from '../../src/transformers/page-info';
import { createTransactions } from '../helpers/mock-creators';

jest.mock('../../src/transformers/page-info', () => ({
  toPageInfo: jest.fn(() => 'toPageInfo'),
}));

jest.mock('../../src/transformers/helpers/transactions', () => ({
  toTransactionsDetail: jest.fn(() => 'toTransactionsDetail'),
}));

test('transforms MidgardTransactions into TransactionConnection', () => {
  const connection = transform(createTransactions(), { limit: 10, offset: 0 });

  expect(connection).toStrictEqual({
    nodes: ['toTransactionsDetail'],
    totalCount: 1,
    pageInfo: 'toPageInfo',
  });
  expect(toPageInfo).toBeCalledTimes(1);
  expect(toTransactionsDetail).toBeCalledTimes(1);
});
