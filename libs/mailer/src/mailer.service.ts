import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class MailerService {
  constructor(
    @InjectQueue('mailer')
    private readonly queue: Queue,
  ) {}

  async send(): Promise<void> {
    await this.queue.add('mailer', {
      to: 'puthnadine@gmail.com', // list of receivers
      subject: 'Testing Nest MailerModule ✔', // Subject line
      template: 'home', // plaintext body
      messageId: '168cdd69-6174-0a7c-1c8e-33d2348920c9',
      context: {
        name: 'POUTH Nadin',
      },
    });
  }
}
