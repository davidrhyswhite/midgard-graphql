import { assetFromString } from '@thorchain/asgardex-util';
import { toSum, toTransaction, toTransactionsDetail } from '../../../src/transformers/helpers/transactions';
import { createMidgardSum, createMidgardTx, createTransactionDetail } from '../../helpers/mock-creators';

jest.mock('@thorchain/asgardex-util', () => ({
  assetFromString: jest.fn(() => 'assetFromString'),
}));

beforeEach(() => jest.clearAllMocks());

describe('toSum', () => {
  test('converts MidgardSum to Sum', () => {
    const raw = createMidgardSum();
    const sum = toSum(raw);

    expect(sum).toStrictEqual({
      asset: 'assetFromString',
      amount: 'amount',
    });
    expect(assetFromString).toBeCalledTimes(1);
    expect(assetFromString).toBeCalledWith(raw.asset);
  });
});

describe('toTransaction', () => {
  test('converts MidgardTx to Transaction', () => {
    const raw = createMidgardTx();
    const transaction = toTransaction(raw);

    expect(transaction).toStrictEqual({
      txID: 'txID',
      memo: 'memo',
      address: 'address',
      coins: [
        {
          asset: 'assetFromString',
          amount: 'amount',
        },
      ],
    });
    expect(assetFromString).toBeCalledTimes(1);
  });
});

describe('toTransactionsDetail', () => {
  test('converts MidgardTransactionDetail to TransactionDetail', () => {
    const raw = createTransactionDetail();
    const transactionDetail = toTransactionsDetail(raw);

    expect(transactionDetail).toStrictEqual({
      pool: 'assetFromString',
      type: 'stake',
      status: 'success',
      in: {
        txID: 'txID',
        memo: 'memo',
        address: 'address',
        coins: [
          {
            asset: 'assetFromString',
            amount: 'amount',
          },
        ],
      },
      out: [
        {
          txID: 'txID',
          memo: 'memo',
          address: 'address',
          coins: [
            {
              asset: 'assetFromString',
              amount: 'amount',
            },
          ],
        },
      ],
      date: 123456789,
      gas: {
        asset: 'assetFromString',
        amount: 'amount',
      },
      options: {
        priceTarget: 'priceTarget',
        withdrawBasisPoints: 'withdrawBasisPoints',
        asymmetry: 'asymmetry',
      },
      height: 'height',
      events: {
        fee: 'fee',
        stakeUnits: 'stakeUnits',
        slip: 'slip',
      },
    });
    expect(assetFromString).toBeCalledTimes(4);
  });
});
