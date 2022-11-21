import { DynamicModule, Module } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { MailerProcessor } from './mailer.processor';
import { MailerTransporter } from './mailer.transporter';
import { MailerConfigOptions } from './mailer.option';
import { MailerConfig, MAILER_CONFIG } from './config.model';

@Module({})
export class MailerModule {
  public static forRootAsync(
    options: MailerConfigOptions<MailerConfig>,
  ): DynamicModule {
    return {
      imports: options.imports,
      providers: [
        {
          provide: MAILER_CONFIG,
          useFactory: options.useFactory,
          inject: options.inject,
        },
        MailerTransporter,
        MailerService,
        MailerProcessor,
      ],
      exports: [MailerService],
      module: MailerModule,
    };
  }
}
