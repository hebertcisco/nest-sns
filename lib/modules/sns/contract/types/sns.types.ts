import * as sns from '@aws-sdk/client-sns';

export type CreateTopicResponse = sns.CreateTopicResponse;
export type PublishResponse = sns.PublishResponse;

export type SubscribeInput = sns.SubscribeInput;
export type SubscribeCommandOutput = sns.SubscribeCommandOutput;

export type PublishInput = sns.PublishInput;
export type CreateTopicInput = sns.CreateTopicInput;

export type Credentials = {
  accessKeyId: string;
  secretAccessKey: string;
  sessionToken?: string;
};
