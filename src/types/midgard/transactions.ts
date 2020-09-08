import { Asset } from '@thorchain/asgardex-util';
import { PageInfo } from '../page-info';

export enum TransactionType {
  swap = 'swap',
  stake = 'stake',
  unstake = 'unstake',
  rewards = 'rewards',
  add = 'add',
  pool = 'pool',
  gas = 'gas',
  refund = 'refund',
  doubleSwap = 'doubleSwap',
}

export enum TransactionStatus {
  success = 'success',
  refund = 'refund',
}

export type Sum = {
  asset: Asset;
  amount: string;
};

export type Transaction = {
  txID: string;
  memo: string;
  address: string;
  coins: Array<Sum>;
};

export type TransactionDetail = {
  pool: Asset;
  type: TransactionType;
  status: TransactionStatus;
  in: Transaction;
  out: Array<Transaction>;
  date: number;
  gas?: Sum | void;
  options: {
    priceTarget: string;
    withdrawBasisPoints: string;
    asymmetry: string;
  };
  height: string;
  events: {
    fee: string;
    stakeUnits: string;
    slip: string;
  };
};

export type TransactionConnection = {
  totalCount: number;
  nodes: Array<TransactionDetail>;
  pageInfo: PageInfo;
};

export type MidgardSum = {
  asset: string;
  amount: string;
};

export type MidgardTx = {
  txID: string;
  memo: string;
  address: string;
  coins: Array<MidgardSum>;
};

export type MidgardTransactionDetail = {
  pool: string;
  type: TransactionType;
  status: TransactionStatus;
  in: MidgardTx;
  out: Array<MidgardTx>;
  date: number;
  gas: MidgardSum;
  options: {
    priceTarget: string;
    withdrawBasisPoints: string;
    asymmetry: string;
  };
  height: string;
  events: {
    fee: string;
    stakeUnits: string;
    slip: string;
  };
};

export type MidgardTransactions = {
  count: number;
  txs: Array<MidgardTransactionDetail>;
};
