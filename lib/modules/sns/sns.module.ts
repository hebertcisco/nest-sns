import { DynamicModule, forwardRef, InjectionToken, Module, Provider, Type } from '@nestjs/common';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';

import { SnsService } from './services';
import { SmsService } from '../sms';

import { SNS_INSTANCE_TOKEN, SNS_MODULE_ID, SNS_OPTIONS } from './common';

import type { SnsAsyncOptions, SnsOptions, SnsOptionsFactory } from './contract';

@Module({
  providers: [SnsService, { provide: SmsService, useFactory: () => forwardRef(() => require('./sms.service').SmsService) }],
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
        {
          provide: SNS_MODULE_ID,
          useValue: randomStringGenerator(),
        },
      ],
    };
  }

  static registerAsync(options: SnsAsyncOptions): DynamicModule {
    return {
      module: SnsModule,
      imports: options.imports,
      providers: [
        ...this.createAsyncProviders(options),
        {
          provide: SNS_INSTANCE_TOKEN,
          useFactory: (config: SnsOptions) => config,
          inject: [SNS_OPTIONS],
        },
        {
          provide: SNS_MODULE_ID,
          useValue: randomStringGenerator(),
        },
        ...(options.extraProviders || []),
      ],
    };
  }

  private static createAsyncProviders(options: SnsAsyncOptions): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: options.useClass as InjectionToken,
        useClass: options.useClass as Type<any>,
      },
    ];
  }

  private static createAsyncOptionsProvider(options: SnsAsyncOptions): Provider {
    if (options.useFactory) {
      return {
        provide: SNS_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }
    return {
      provide: SNS_OPTIONS,
      useFactory: async (optionsFactory: SnsOptionsFactory) => optionsFactory.createSnsOptions(),
      inject: [(options.useExisting as Type<SnsOptionsFactory>) || (options.useClass as Type<SnsOptionsFactory>)],
    };
  }
}
