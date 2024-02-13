import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CustomConfigService<T> {
  private readonly appConfig: T;
  constructor(private configService: ConfigService) {
    this.appConfig = configService.get<T>('appConfig');
  }

  public getAppConfig(): T {
    return this.appConfig;
  }
}
