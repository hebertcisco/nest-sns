import { Module } from '@nestjs/common';

import { SnsService } from './services';
import { SmsService } from '../sms/services/sms.service';

import { SNS_OPTIONS } from './common/constants';

import type { SnsOptions } from './contract';

@Module({
  imports: [],
  providers: [SnsService, SmsService],
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
        SnsService,
        SmsService,
      ],
      exports: [SnsService, SmsService],
      global: isGlobal,
    };
  }
}
