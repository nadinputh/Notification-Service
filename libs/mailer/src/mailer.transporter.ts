import { Inject, Injectable } from '@nestjs/common';
import nodemailer from 'nodemailer';
import { MailerConfig, MAILER_CONFIG } from './config.model';
import hbs from 'nodemailer-express-handlebars';
import path from 'path';

@Injectable()
export class MailerTransporter {
  private readonly transporter: any;
  constructor(
    @Inject(MAILER_CONFIG)
    private readonly config: MailerConfig,
  ) {
    const transporter = {
      host: this.config.host,
      port: this.config.port,
      ignoreTLS: this.config.ignoreTLS,
      auth: {
        user: this.config.username,
        pass: this.config.password,
      },
    };
    // create reusable transporter object using the default SMTP transport
    this.transporter = nodemailer.createTransport(transporter);
    this.transporter.use(
      'compile',
      hbs({
        extName: '.hbs',
        viewPath: path.resolve(__dirname + '/views/mail'),
        viewEngine: {
          extname: '.hbs', // handlebars extension
          layoutsDir: path.resolve(__dirname + '/views/mail'),
          defaultLayout: path.resolve(__dirname + '/views/mail/layouts/main'),
          partialsDir: path.resolve(__dirname + '/views/mail/partials'),
        },
      }),
    );
  }

  sendMail(data: any): Promise<any> {
    if (!data.from) {
      data.from = {
        name: this.config.fromName,
        address: this.config.fromAddress,
      };
    }
    return new Promise((resolve, reject) =>
      this.transporter.sendMail(data, (error, info) => {
        if (!!error) {
          return reject(error);
        }
        return resolve(info);
      }),
    );
  }
}
