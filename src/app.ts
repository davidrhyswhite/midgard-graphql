import { ApolloServer } from 'apollo-server';
import schema from './schema';
import MidgardAPI from './datasources/midgard';
import { DataSources } from './types/context';

const app = new ApolloServer({
  schema,
  playground: true,
  introspection: true,
  dataSources: (): DataSources => ({
    midgardAPI: new MidgardAPI(),
  }),
});

export default app;
