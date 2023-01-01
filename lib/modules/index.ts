export * from './sms';
export type { SendSMSInput } from './sms';

export * from './sns';
export { SnsOptionsFactory, SnsOptions, SnsAsyncOptions } from './sns';
export type {
  CreateTopicResponse,
  PublishResponse,
  SubscribeInput,
  SubscribeCommandOutput,
  PublishInput,
  CreateTopicInput,
} from './sns';
