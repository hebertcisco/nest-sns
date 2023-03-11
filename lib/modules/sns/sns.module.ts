import { forwardRef, Module } from '@nestjs/common';

import { SnsService } from './services';
import { SmsService } from '../sms';

import { SNS_OPTIONS } from './common';

import { SmsModule } from '../sms/sms.module';
import type { SnsOptions } from './contract';

@Module({
  imports: [forwardRef(() => SmsModule)],
  providers: [SnsService],
  exports: [SnsService, SmsService],
})
export class SnsModule {
  static register(options: SnsOptions) {
    const { isGlobal, ...snsOptions } = options;
    return {
      module: SnsModule,
      providers: [
        {
          provide: SNS_OPTIONS,
          useValue: snsOptions,
        },
      ],
      exports: [SnsService, SmsService],
      global: isGlobal,
    };
  }
}
