import { assetFromString } from '@thorchain/asgardex-util';
import { toSum, toGas, toTransaction, toTransactionsDetail } from '../../../src/transformers/helpers/transactions';
import { TransactionType, TransactionStatus } from '../../../src/types/midgard/transactions';

jest.mock('@thorchain/asgardex-util', () => ({
  assetFromString: jest.fn(() => 'assetFromString'),
}));

beforeEach(() => jest.clearAllMocks());

describe('toSum', () => {
  test('converts MidgardSum to Sum', () => {
    const raw = {
      asset: 'AAA.BBB-CCC',
      amount: 'amount',
    };
    const sum = toSum(raw);

    expect(sum).toStrictEqual({
      asset: 'assetFromString',
      amount: 'amount',
    });
    expect(assetFromString).toBeCalledTimes(1);
    expect(assetFromString).toBeCalledWith(raw.asset);
  });
});

describe('toGas', () => {
  test('converts MidgardSum to Sum when valid', () => {
    const raw = {
      asset: 'AAA.BBB-CCC',
      amount: 'amount',
    };
    const sum = toGas(raw);

    expect(sum).toStrictEqual({
      asset: 'assetFromString',
      amount: 'amount',
    });
    expect(assetFromString).toBeCalledTimes(1);
    expect(assetFromString).toBeCalledWith(raw.asset);
  });

  test('returns null when input is undefined', () => {
    const sum = toGas(undefined);

    expect(sum).toBeNull();
    expect(assetFromString).toBeCalledTimes(0);
  });
});

describe('toTransaction', () => {
  test('converts MidgardTx to Transaction', () => {
    const raw = {
      txID: 'txID',
      memo: 'memo',
      address: 'address',
      coins: [
        {
          asset: 'AAA.BBB-CCC',
          amount: 'amount',
        },
        {
          asset: 'AAA.BBB-CCC',
          amount: 'amount',
        },
      ],
    };
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
        {
          asset: 'assetFromString',
          amount: 'amount',
        },
      ],
    });
    expect(assetFromString).toBeCalledTimes(2);
  });
});

describe('toTransactionsDetail', () => {
  test('converts MidgardTransactionDetail to TransactionDetail', () => {
    const raw = {
      pool: 'AAA.BBB-CCC',
      type: TransactionType.swap,
      status: TransactionStatus.success,
      in: {
        txID: 'txID-1',
        memo: 'memo-1',
        address: 'address-1',
        coins: [
          {
            asset: 'AAA.BBB-CCC',
            amount: 'amount-1',
          },
        ],
      },
      out: [
        {
          txID: 'txID-2',
          memo: 'memo-2',
          address: 'address-2',
          coins: [
            {
              asset: 'AAA.BBB-CCC',
              amount: 'amount-2',
            },
          ],
        },
      ],
      date: 123456789,
      gas: {
        asset: 'AAA.BBB-CCC',
        amount: 'amount-3',
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
    };
    const transactionDetail = toTransactionsDetail(raw);

    expect(transactionDetail).toStrictEqual({
      pool: 'assetFromString',
      type: 'swap',
      status: 'success',
      in: {
        txID: 'txID-1',
        memo: 'memo-1',
        address: 'address-1',
        coins: [
          {
            asset: 'assetFromString',
            amount: 'amount-1',
          },
        ],
      },
      out: [
        {
          txID: 'txID-2',
          memo: 'memo-2',
          address: 'address-2',
          coins: [
            {
              asset: 'assetFromString',
              amount: 'amount-2',
            },
          ],
        },
      ],
      date: 123456789,
      gas: {
        asset: 'assetFromString',
        amount: 'amount-3',
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
