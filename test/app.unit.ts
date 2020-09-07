import { ApolloServer } from 'apollo-server';

jest.mock('apollo-server');

beforeAll(() => require('../src/app'));

test('calls ApolloServer once', () => {
  expect(ApolloServer).toBeCalledTimes(1);
});

test('enables introspection', () => {
  expect(ApolloServer).toBeCalledWith(
    expect.objectContaining({
      introspection: true,
    }),
  );
});

test('enables playground', () => {
  expect(ApolloServer).toBeCalledWith(
    expect.objectContaining({
      playground: true,
    }),
  );
});
