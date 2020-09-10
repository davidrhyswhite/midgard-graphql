import { assetFromString } from '@thorchain/asgardex-util';
import { MidgardTransactionDetail, MidgardTx, MidgardSum } from 'midgard/transactions';
import { AssetPoolType, TransactionDetail, Transaction, Sum } from '../../generated/graphql';

export function toSum(sum: MidgardSum): Sum {
  return {
    ...sum,
    asset: assetFromString(sum.asset) as AssetPoolType,
  };
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
    pool: assetFromString(data.pool) as AssetPoolType,
    in: toTransaction(data.in),
    out: data.out.map(toTransaction),
    gas: toSum(data.gas),
  };
}
