import { ModuleMetadata, Type } from '@nestjs/common';
import { SNSClientConfig } from '@aws-sdk/client-sns';

import type { Credentials } from '../types/sns.types';

export interface SnsOptionsFactory {
  createSnsOptions(): Promise<SNSClientConfig> | SNSClientConfig;
}

export interface SnsOptions extends SNSClientConfig {
  isGlobal?: boolean;
  region?: string;
  credentials: Credentials;
}

export interface SnsAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<SnsOptionsFactory>;
  useClass?: Type<SnsOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<SNSClientConfig> | SNSClientConfig;
  inject?: any[];
  isGlobal?: boolean;
}
