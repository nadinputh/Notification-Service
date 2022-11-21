import { Module } from '@nestjs/common';
import { UserService } from '@services/impl/user.service';
import { InfrastructureModule } from '@infrastructure/infrastructure.module';
import { USER_SERVICE } from '@services/user.service';
import { NotifierModule } from '@notifier';
import { MailerModule } from '@mailer';
import { BullModule } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';
import mailerConfig from 'src/_config/mailer.config';

@Module({
  imports: [
    InfrastructureModule,
    NotifierModule,
    MailerModule.forRootAsync({
      imports: [
        BullModule.registerQueue({
          name: 'mailer',
        }),
        ConfigModule.forFeature(mailerConfig('mailer')),
      ],
      useFactory: (config: ConfigService) => config.get('mailer'),
      inject: [ConfigService],
    }),
  ],
  providers: [
    {
      provide: USER_SERVICE,
      useClass: UserService,
    },
  ],
  exports: [
    {
      provide: USER_SERVICE,
      useClass: UserService,
    },
  ],
})
export class DomainModule {}
