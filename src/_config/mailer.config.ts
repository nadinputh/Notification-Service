import { registerAs } from '@nestjs/config';
import { toBoolean } from '@utility/utils';

export default (config) =>
  registerAs(config, () => ({
    host: process.env.MAIL_HOST,
    port: parseInt(process.env.MAIL_PORT || '1024'),
    username: process.env.MAIL_USERNAME,
    password: process.env.MAIL_PASSWORD,
    fromName: process.env.MAIL_FROM_NAME,
    fromAddress: process.env.MAIL_FROM_ADDRESS,
    ignoreTLS: toBoolean(process.env.MAIL_IGNORE_TLS) || true,
  }));
