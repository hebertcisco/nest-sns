import { DynamicModule, Module, Provider } from '@nestjs/common';
import { SnsService } from './services/sns.service';
import { SNS_OPTIONS } from './constants/sns.constants';
import * as optionTypes from './interfaces/sns-module.interfaces';

@Module({
  imports: [],
  providers: [SnsService],
  exports: [SnsService],
})
export class SnsModule {
  static register(options: optionTypes.SnsOptions): DynamicModule {
    const { isGlobal, ...snsOptions } = options;
    isGlobal;
    return {
      module: SnsModule,
      providers: [
        {
          provide: SNS_OPTIONS,
          useValue: snsOptions,
        },
        SnsService,
      ],
      exports: [SnsService],
      global: isGlobal,
    };
  }
}
