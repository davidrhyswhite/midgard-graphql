import { ApolloServer } from 'apollo-server-lambda';
import { createServer } from '../app';

const server = createServer(ApolloServer) as ApolloServer;

exports.handler = server.createHandler();
