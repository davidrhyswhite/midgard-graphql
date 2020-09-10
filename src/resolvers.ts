import { MidgardAssetPool } from './types/midgard/asset-pools';
import { transform as transactionTransformer } from './transformers/transactions';
import { transform as assetPoolTransformer } from './transformers/asset-pool';
import { Resolvers, Stats, TransactionConnection, QueryTransactionsArgs, AssetPool } from './generated/graphql';
import { Context } from './types/context';

const resolvers: Resolvers = {
  Query: {
    async stats(_, __, { dataSources: { midgardAPI } }: Context): Promise<Stats> {
      return await midgardAPI.getStats();
    },

    async pools(_, __, { dataSources: { midgardAPI } }: Context): Promise<Array<AssetPool>> {
      const pools = await midgardAPI.getPools();

      const assets: Array<Array<AssetPool>> = await Promise.all(
        pools.map(
          async (asset: string): Promise<Array<AssetPool>> => {
            const assetPools: Array<MidgardAssetPool> = await midgardAPI.getAssetPools(asset);

            return assetPools.map(assetPoolTransformer);
          },
        ),
      );

      return assets.flat();
    },

    async transactions(
      _,
      { limit, offset }: QueryTransactionsArgs,
      { dataSources: { midgardAPI } }: Context,
    ): Promise<TransactionConnection> {
      const response = await midgardAPI.getTransactions({ limit, offset });

      return transactionTransformer(response, { limit, offset });
    },
  },
};

export default resolvers;
