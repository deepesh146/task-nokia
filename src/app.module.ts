import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EarthMarsController } from './earth-mars.controller';
import { TestController } from './test.controller';
import { LoggingMiddleware } from './middleware/logging';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { MarsEarthInterceptor } from './interceptors/mars-earth.interceptor';

@Module({
  imports: [],
  controllers: [AppController, TestController, EarthMarsController],
  providers: [AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: MarsEarthInterceptor,
    },
  ],

})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*'); // Apply the middleware globally
  }
}