import winston from 'winston';

const { NODE_ENV } = process.env;
const isProductionOrTestEnv = NODE_ENV === 'production' || NODE_ENV === 'test';

const options: winston.LoggerOptions = {
  transports: [
    new winston.transports.Console({
      level: !isProductionOrTestEnv ? 'debug' : 'error',
    }),
    new winston.transports.File({ filename: './logs/debug.log', level: 'debug' }),
  ],
};

const logger = winston.createLogger(options);

if (!isProductionOrTestEnv) {
  logger.debug('Logging initialized at debug level');
}

export default logger;
