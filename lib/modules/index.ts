export * from './sms';
export * from './sms/contract';
export * from './sms/services';
export * from './sms/sms.module';

export type { SendSMSInput } from './sms';

export * from './sns';
export * from './sns/sns.module';
export * from './sns/common';
export * from './sns/contract';
export * from './sns/services';

export { SnsOptionsFactory, SnsOptions, SnsAsyncOptions } from './sns';
export type {
  CreateTopicResponse,
  PublishResponse,
  SubscribeInput,
  SubscribeCommandOutput,
  PublishInput,
  CreateTopicInput,
} from './sns';
