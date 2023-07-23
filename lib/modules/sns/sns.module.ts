import { DynamicModule, InjectionToken, Module, Provider } from '@nestjs/common';

import { SnsService } from './services';
import { SmsService } from '../sms';

import { SNS_OPTIONS } from './common';

import type { SnsAsyncOptions, SnsOptions, SnsOptionsFactory } from './contract';

@Module({})
export class SnsModule {
  static register(options: SnsOptions): DynamicModule {
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

  static registerAsync(options: SnsAsyncOptions): DynamicModule {
    const { isGlobal, ...snsOptions } = options;
    const asyncOpts = this.createAsyncProviders(snsOptions);
    return {
      module: SnsModule,
      imports: options.imports,
      providers: [SnsService, ...asyncOpts],
      exports: [SnsService],
      global: options.isGlobal,
    };
  }

  private static createAsyncProviders(options: SnsAsyncOptions): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    const providers = [
      {
        provide: SNS_OPTIONS,
        useFactory: async (optionsFactory: SnsOptionsFactory) => await optionsFactory.createSnsOptions(),
        inject: [options.useExisting || options.useClass],
      },
    ];
    return providers as Provider[];
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
      useFactory: async (optionsFactory: SnsOptionsFactory) => await optionsFactory.createSnsOptions(),
      inject: [(options.useExisting as InjectionToken) || (options.useClass as InjectionToken)],
    };
  }
}
