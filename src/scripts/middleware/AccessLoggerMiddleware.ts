import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as net from 'net';
import { AccessLogger } from '../logger/AccessLogger';

@Injectable()
export class AccessLoggerMiddleware implements NestMiddleware {
  constructor(private readonly accessLogger: AccessLogger) {}
  use(req: Request, res: Response, next: NextFunction) {
    const startAt = process.hrtime();
    const { method, originalUrl } = req;
    const userAgent = req.get('user-agent') || '';
    const clientIp = req['clientIp'];
    const clientIpType = net.isIP(clientIp);

    res.on('close', () => {
      if ('/healthy' === originalUrl) {
        return;
      }

      const { statusCode } = res;
      const contentLength = res.get('content-length');
      const diff = process.hrtime(startAt);
      const responseTime = diff[0] * 1e3 + diff[1] * 1e-6;
      this.accessLogger.log({
        method: method,
        originalUrl: originalUrl,
        statusCode: statusCode,
        responseTime: responseTime,
        contentLength: contentLength,
        userAgent: userAgent,
        clientIpType: clientIpType,
        clientIp: clientIp,
      });
    });

    next();
  }
}
