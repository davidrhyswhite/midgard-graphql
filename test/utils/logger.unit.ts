import winston from 'winston';

jest.mock('winston', () => ({
  transports: {
    Console: jest.fn().mockImplementation(() => ({ mock: 'winston.transports.Console' })),
    File: jest.fn().mockImplementation(() => ({ mock: 'winston.transports.File' })),
  },
  createLogger: jest.fn(() => 'winston.createLogger'),
}));

beforeAll(() => require('../../src/utils/logger'));

test('calls winston.transports.Console with level: error', () => {
  expect(winston.transports.Console).toBeCalledWith({
    level: 'error',
  });
});

test('calls winston.transports.File', () => {
  expect(winston.transports.File).toBeCalledWith({
    filename: './logs/debug.log',
    level: 'debug',
  });
});

test('calls winston.cerateLogger', () => {
  expect(winston.createLogger).toBeCalledWith({
    transports: [{ mock: 'winston.transports.Console' }, { mock: 'winston.transports.File' }],
  });
});
