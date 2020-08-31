import { IResolvers } from 'apollo-server';
import { stats } from './resolvers/stats';
import { pools } from './resolvers/pools';

const resolvers: IResolvers = {
  Query: {
    stats,
    pools,
  },
};

export default resolvers;
