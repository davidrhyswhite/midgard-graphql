import { toTransactionsDetail } from './helpers/transactions';
import { toPageInfo } from './page-info';
import { TransactionConnection, MidgardTransactions } from 'midgard/transactions';

export function transform(
  data: MidgardTransactions,
  { limit, offset }: { limit: number; offset: number },
): TransactionConnection {
  return {
    nodes: data.txs.map(toTransactionsDetail),
    totalCount: data.count,
    pageInfo: toPageInfo(data.count, limit, offset),
  };
}
