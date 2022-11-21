export const MAILER_CONFIG = 'MAILER_CONFIG';

export class MailerConfig {
  host: string;
  port: number;
  ignoreTLS: boolean;
  username: string;
  password: string;
  fromName: string;
  fromAddress: string;
}
