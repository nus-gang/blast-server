import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const AppDataSource = new DataSource({
  type: 'postgres', //'mysql'///////////
  host: process.env.RDS_HOST || '127.0.0.1',
  port: +process.env.RDS_PORT || 35432, //3306
  username: process.env.RDS_USERNAME || 'root', //'root'
  password: process.env.RDS_PASSWORD || 'root', //'adminadmin'
  database: process.env.RDS_DATABASE || 'dbc_test', //'dbc_platform_local', //'dbc_test',
  entities: ['src/**/*.entity.ts'],
  logging: true,
  synchronize: false,
  migrationsRun: false,
  migrations: ['src/migrations/*{.ts,.js}'],
  migrationsTableName: 'migration',
  migrationsTransactionMode: 'all',
  namingStrategy: new SnakeNamingStrategy(),
});
