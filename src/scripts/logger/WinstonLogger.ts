import { createLogger, format, transports } from 'winston';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const DailyRotateFile = require('winston-daily-rotate-file');
const { combine, colorize, timestamp } = format;

let logLevel = process.env.log_level;
if (!logLevel) {
  logLevel = 'debug';
}

interface TransformableInfo {
  level: string;
  message: string;
  stack;
  timestamp;

  [key: string]: any;
}

export const instance = createLogger({
  transports: [
    new transports.Console({
      level: logLevel,
      handleExceptions: true,
      format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        colorize(),
        format.printf((info: TransformableInfo) => {
          if (info.stack) {
            return `[${info.level}] ${info.timestamp} : ${info.message} - stack: ${info.stack}`;
          } else {
            return `[${info.level}] ${info.timestamp} : ${info.message}`;
          }
        }),
      ),
    }),
    new DailyRotateFile({
      level: logLevel,
      dirname: 'logs',
      filename: 'app.log',
      maxFiles: 30,
      maxSize: 52428800,
      handleExceptions: false,
    }),
  ],
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    colorize(),
    format.printf((info: TransformableInfo) => {
      if (info.stack) {
        return `[${info.level}] ${info.timestamp} : ${info.message} - stack: ${info.stack}`;
      } else {
        return `[${info.level}] ${info.timestamp} : ${info.message}`;
      }
    }),
  ),
  level: logLevel,
});
