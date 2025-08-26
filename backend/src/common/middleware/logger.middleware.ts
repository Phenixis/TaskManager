import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LogsService } from '../../logs/logs.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logsService: LogsService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, body } = req;
    const start = Date.now();

    console.log(`➡️  ${method} ${originalUrl}`);

    res.on('finish', () => {
      const duration = Date.now() - start;

      const logEntry = {
        method,
        url: originalUrl,
        statusCode: res.statusCode,
        duration,
        requestBody: body,
      };

      this.logsService.createLog(logEntry); // persiste dans db.json

      console.log(`⬅️  ${method} ${originalUrl} ${res.statusCode} (${duration}ms)`);
    });

    next();
  }
}
