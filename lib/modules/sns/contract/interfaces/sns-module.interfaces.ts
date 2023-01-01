import { ModuleMetadata, Type } from '@nestjs/common';
import * as sns from '@aws-sdk/client-sns';
import type { Credentials } from '../types/sns.types';

export interface SnsOptionsFactory {
  createSnsOptions(): Promise<sns.SNSClientConfig> | sns.SNSClientConfig;
}

export interface SnsOptions {
  isGlobal?: boolean;
  region?: string;
  credentials: Credentials;
}

export interface SnsAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<SnsOptionsFactory>;
  useClass?: Type<SnsOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<sns.SNSClientConfig> | sns.SNSClientConfig;
  inject?: any[];
  isGlobal?: boolean;
}
