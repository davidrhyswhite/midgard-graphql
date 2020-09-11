import { ApolloServer } from 'apollo-server';
import { loadConfigSync } from 'graphql-config';
import { createServer } from '../src/app';

jest.mock('apollo-server');
jest.mock('graphql-config', () => ({
  loadConfigSync: jest.fn(() => 'loadConfigSync'),
}));

test('loads config from root directory', () => {
  expect(loadConfigSync).toBeCalledWith({ rootDir: './' });
});

test('calls ApolloServer once', () => {
  createServer(ApolloServer);
  expect(ApolloServer).toBeCalledTimes(1);
});

test('enables introspection', () => {
  createServer(ApolloServer);
  expect(ApolloServer).toBeCalledWith(
    expect.objectContaining({
      introspection: true,
    }),
  );
});

test('enables playground', () => {
  createServer(ApolloServer);
  expect(ApolloServer).toBeCalledWith(
    expect.objectContaining({
      playground: { config: 'loadConfigSync' },
    }),
  );
});
