import { Abstract, DynamicModule, Type } from '@nestjs/common';

export class MailerConfigOptions<T> {
  imports: Array<Type<any> | DynamicModule | Promise<DynamicModule>>;
  /**
   * Factory function that returns an instance of the provider to be injected.
   */
  useFactory: (...args: any[]) => T;
  /**
   * Optional list of providers to be injected into the context of the Factory function.
   */
  inject?: Array<Type<any> | string | symbol | Abstract<any>>;
}
