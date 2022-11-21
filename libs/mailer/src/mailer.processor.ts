import {
  OnQueueActive,
  OnQueueCompleted,
  OnQueueFailed,
  Process,
  Processor,
} from '@nestjs/bull';
import { Job } from 'bull';
import { Logger } from '@nestjs/common';
import { MailerTransporter } from './mailer.transporter';

@Processor('mailer')
export class MailerProcessor {
  private readonly logger = new Logger(MailerProcessor.name);
  constructor(private readonly transporter: MailerTransporter) {}

  @Process('mailer')
  handleTranscode(job: Job) {
    this.logger.debug('Start transcoding...');
    this.logger.debug(`Transcoding ${job.id} completed`);
  }

  @OnQueueActive()
  onActive(job: Job) {
    this.logger.debug(`Processing job ${job.id} of type ${job.name}...`);
    this.transporter.sendMail(job.data);
  }

  @OnQueueFailed()
  onFalied(job: Job, error: Error) {
    this.logger.error(
      `Processing job ${job.id} of type ${job.name} is error ${error}`,
    );
  }

  @OnQueueCompleted()
  onCompleted(job: Job, result: any) {
    this.logger.debug(
      `Processed job ${job.id} of type ${job.name} with result ${result}`,
    );
  }
}
