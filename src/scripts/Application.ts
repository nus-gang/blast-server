import { NestFactory } from '@nestjs/core';
import { json as BodyParserJson } from 'body-parser';
import { AppModule } from './AppModule';
import { WinstonModule } from 'nest-winston';
import { LoggerService } from '@nestjs/common';
import { HttpErrorFilter } from './filter/HttpErrorFilter';
import { instance } from './logger/WinstonLogger';

export class Application {
  private static instance: Application;
  private listenPort: number = 8080;
  private loggerService: LoggerService = null;

  private app;

  constructor() {}

  public static getInstance(): Application {
    if (!Application.instance) {
      Application.instance = new Application();
    }
    return Application.instance;
  }

  async init(listenPort: number): Promise<void> {
    this.listenPort = listenPort;

    //initializeTransactionalContext();
  }

  async start(): Promise<void> {
    this.loggerService = WinstonModule.createLogger({
      instance: instance,
    });

    this.app = await NestFactory.create(AppModule, {
      bodyParser: false,
      logger: this.loggerService,
    });
    this.app.use(BodyParserJson());
    this.app.useGlobalFilters(new HttpErrorFilter(this.loggerService));
    this.app.enableCors(true);
    this.app.use((req, _, next) => {
      next();
    });

    await this.app.listen(this.listenPort, () => {
      this.loggerService.log(`Listening at http://0.0.0.0:${this.listenPort}`);
    });
  }

  async close(): Promise<void> {
    if (this.loggerService) {
      this.loggerService.log(`Server is shutdown`);
    }
  }
}
