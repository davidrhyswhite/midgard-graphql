import { ApolloServer } from 'apollo-server';
import { createServer } from '../src/app';

jest.mock('apollo-server');

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
      playground: true,
    }),
  );
});
