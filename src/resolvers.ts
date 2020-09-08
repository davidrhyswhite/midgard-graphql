import { IResolvers } from 'graphql-tools';
import { stats } from './resolvers/stats';
import { pools } from './resolvers/pools';
import { transactions } from './resolvers/transactions';

const resolvers: IResolvers = {
  Query: {
    stats,
    pools,
    transactions,
  },
};

export default resolvers;
