import { assetFromString } from '@thorchain/asgardex-util';
import {
  TransactionDetail,
  Transaction,
  Sum,
  MidgardTransactionDetail,
  MidgardTx,
  MidgardSum,
} from 'midgard/transactions';

export function toSum(sum: MidgardSum): Sum {
  return {
    ...sum,
    asset: assetFromString(sum.asset),
  };
}

export function toGas(sum: MidgardSum): Sum | void {
  if (typeof sum === 'undefined') {
    return null;
  }
  return toSum(sum);
}

export function toTransaction(data: MidgardTx): Transaction {
  return {
    ...data,
    coins: data.coins.map(toSum),
  };
}

export function toTransactionsDetail(data: MidgardTransactionDetail): TransactionDetail {
  return {
    ...data,
    pool: assetFromString(data.pool),
    in: toTransaction(data.in),
    out: data.out.map(toTransaction),
    gas: toGas(data.gas),
  };
}
