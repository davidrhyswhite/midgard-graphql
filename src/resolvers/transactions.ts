import { transform } from '../transformers/transactions';
import { Context } from '../types/context';
import { TransactionConnection } from '../types/midgard/transactions';

type TransactionsQueryArgs = {
  limit: number;
  offset: number;
};
export const transactions = async (
  _: void,
  { limit, offset }: TransactionsQueryArgs,
  { dataSources: { midgardAPI } }: Context,
): Promise<TransactionConnection> => {
  const response = await midgardAPI.getTransactions({ limit, offset });

  return transform(response, { limit, offset });
};
