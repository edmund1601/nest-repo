import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const databaseUrl = configService.get<string>('DATABASE_URL');
        if (databaseUrl) {
          // Let TypeORM/pg parse the full URL. Provide ssl via `extra` when needed.
          return {
            type: 'postgres',
            url: databaseUrl,
            extra: { ssl: { rejectUnauthorized: false } },
            synchronize: false,
            autoLoadEntities: true,
          } as any;
        }

        return {
          type: 'postgres',
          host: configService.get<string>('AZURE_SQL_SERVER'),
          port: configService.get<number>('AZURE_SQL_PORT') ?? 5432,
          database: configService.get<string>('AZURE_SQL_DATABASE'),
          username: configService.get<string>('AZURE_SQL_USER'),
          password: configService.get<string>('AZURE_SQL_PASSWORD'),
          ssl: { rejectUnauthorized: false },
          synchronize: false,
          autoLoadEntities: true,
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
