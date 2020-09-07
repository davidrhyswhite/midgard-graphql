import winston from 'winston';
import WinstonCloudWatch from 'winston-cloudwatch';

const { NODE_ENV, LOCAL } = process.env;
const isProductionOrTestEnv = NODE_ENV === 'production' || NODE_ENV === 'test';

const options: winston.LoggerOptions = {
  transports: [
    new winston.transports.Console({
      level: !isProductionOrTestEnv ? 'debug' : 'error',
    }),
    LOCAL || NODE_ENV === 'test'
      ? new winston.transports.File({ filename: './logs/debug.log', level: 'debug' })
      : new WinstonCloudWatch({
          logGroupName: `/aws/lambda/midgard-graphql-${NODE_ENV}-graphql`,
        }),
  ],
};

const logger = winston.createLogger(options);

if (!isProductionOrTestEnv) {
  logger.debug('Logging initialized at debug level');
}

export default logger;
