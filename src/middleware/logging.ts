import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log("logging Headers for sender & receiver")
    console.log('X-SENDER :', req.headers['x-sender']);
    console.log('X-RECEIVER:', req.headers['x-receiver']);

    const startTime = Date.now(); //start time

    res.on('finish', () => {
      const endTime = Date.now(); //end time
      const duration = endTime - startTime;

      console.log(`Logging Translation Time --- Request to ${req.originalUrl} took ${duration} ms`);
    });
    next();
  }
}