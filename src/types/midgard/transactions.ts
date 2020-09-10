import { TransactionType, TransactionStatus } from '../../generated/graphql';

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
