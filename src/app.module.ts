import { Module } from '@nestjs/common';
import { ApplicationModule } from '@application/application.module';
import { ConfigModule } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: false,
      isGlobal: true,
      envFilePath: '.env',
    }),
    BullModule.forRootAsync({
      useFactory: () => ({
        redis: {
          host: process.env.REDIS_HOST || 'localhost',
          port: parseInt(process.env.REDIS_PORT, 10) || 6379,
          username: process.env.REDIS_USERNAME,
          password: process.env.REDIS_PASSWORD || 'pass',
        },
      }),
    }),
    ApplicationModule,
  ],
})
export class AppModule {}
