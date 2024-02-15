import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import {APP_GUARD, APP_INTERCEPTOR} from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import Configuration from './config/Configuration';
import { ComingController } from './controller/CommingController';
import { ComingService } from '../service/ComingService';
import { CustomConfigService } from './config/CustomConfigService';
import { AccessLogger } from './logger/AccessLogger';
import {ThrottlerGuard, ThrottlerModule} from "@nestjs/throttler";
import {ThrottlerBehindProxyGuard} from "./guard/ThrottlerBehindProxyGuard";
@Module({
  imports: [
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 5,
    }]),
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
      load: [Configuration],
    }),
    /*
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.get('database'),
      inject: [ConfigService]
    }),*/
    CacheModule.register({
      isGlobal: true,
    }),
  ],
  controllers: [ComingController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerBehindProxyGuard
    },
    CustomConfigService,
    Logger,
    AccessLogger,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
    ComingService,
  ],
  exports: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {}
}
