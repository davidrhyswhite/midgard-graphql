import { ApolloServer } from 'apollo-server';
import { createServer } from '../app';
import config from 'config';

const port = config.get('app.port') as number;
const server = createServer(ApolloServer) as ApolloServer;

server.listen({ port }, (): void => {
  console.log(`\n🚀 GraphQL is now running on http://localhost:${port}/graphql`);
});
