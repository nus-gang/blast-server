import { Injectable } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const DailyRotateFile = require('winston-daily-rotate-file');
import { format, createLogger, Logger } from 'winston';

@Injectable()
export class AccessLogger {
  logger: Logger;

  constructor() {
    this.logger = createLogger({
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD hh:mm:ss.sss' }),
        format.printf(({ level, message, timestamp, label }) => {
          if (typeof message !== 'object') {
            message = {
              message: message,
            };
          }
          message.timestamp = timestamp;
          message = JSON.stringify(message);

          return message;
        }),
      ),
      transports: [
        new DailyRotateFile({
          dirname: 'logs',
          filename: 'access.log',
          maxFiles: 30,
          maxSize: 52428800,
          handleExceptions: false,
        }),
      ],
      exitOnError: false,
    });
  }

  log(jsonObject: any) {
    this.logger.info(jsonObject);
  }
}
