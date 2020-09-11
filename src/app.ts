import { Config } from 'apollo-server-core';
import { ApolloServer as Server } from 'apollo-server';
import { ApolloServer as Lambda } from 'apollo-server-lambda';
import { loadConfigSync } from 'graphql-config';
import schema from './schema';
import MidgardAPI from './datasources/midgard';
import { DataSources } from './types/context';

const config = loadConfigSync({ rootDir: './' });

interface ApolloConstructable<T> {
  new (args: Config): T;
}
type ServerType = Server | Lambda;

export function createServer(App: ApolloConstructable<ServerType>): ServerType {
  return new App({
    schema,
    playground: {
      config,
    },
    introspection: true,
    dataSources: (): DataSources => ({
      midgardAPI: new MidgardAPI(),
    }),
  });
}
