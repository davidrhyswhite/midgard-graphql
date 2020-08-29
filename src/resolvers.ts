import { Context } from './types/context';
import { Stats } from './types/midgard/stats';
import { IResolvers } from 'apollo-server';
import { AssetPool } from './types/midgard/asset-pools';

const resolvers: IResolvers = {
  Query: {
    stats: (_: void, __: void, { dataSources }: Context): Promise<Stats> => dataSources.midgardAPI.getStats(),
    pools: (_: void, __: void, { dataSources }: Context): Promise<Array<AssetPool>> =>
      dataSources.midgardAPI.getAssetPools(),
  },
};

export default resolvers;
