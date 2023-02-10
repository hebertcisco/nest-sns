import * as sns from '@aws-sdk/client-sns';

const mMetaData = {
  httpStatusCode: 200,
};
export const mPublishCommand: sns.PublishCommandOutput = {
  MessageId: 'test-id',
  SequenceNumber: '123456',
  $metadata: mMetaData,
};

export const mCreateTopicReponse: sns.CreateTopicCommandOutput = {
  TopicArn: 'new-topic-arn',
  $metadata: mMetaData,
};
export const mCreateTopicInput: sns.CreateTopicCommandInput = {
  Name: 'MyNewTopic',
};
export const mPublishInput: sns.PublishCommandInput = {
  Message: 'Test Message',
  TopicArn: 'test-arn',
};
export const mPublishResponse: sns.PublishCommandOutput = {
  MessageId: 'test-id',
  SequenceNumber: '123456',
  $metadata: mMetaData,
};
export const mSubscribeInput: sns.SubscribeCommandInput = {
  Protocol: 'email',
  TopicArn: 'test-arn',
};
export const mSubscribeResponse: sns.SubscribeCommandOutput = {
  SubscriptionArn: 'test-arn',
  $metadata: mMetaData,
};

export const mUnsubscribeInput: sns.UnsubscribeCommandInput = {
  SubscriptionArn: 'test-arn',
};
export const mUnsubscribeResponse: sns.UnsubscribeCommandOutput = {
  $metadata: mMetaData,
};
export const mDeleteTopicInput: sns.DeleteTopicCommandInput = {
  TopicArn: 'test-arn',
};
export const mDeleteTopicResponse: sns.DeleteTopicCommandOutput = {
  $metadata: mMetaData,
};

export const mListTopicsInput: sns.ListTopicsCommandInput = {
  NextToken: 'test-token',
};

export const mListTopicsResponse: sns.ListTopicsCommandOutput = {
  $metadata: mMetaData,
  Topics: [
    {
      TopicArn: 'test-arn',
    },
  ],
};

export const mListSubscriptionsInput: sns.ListSubscriptionsCommandInput = {
  NextToken: 'test-token',
};
export const mListSubscriptionsResponse: sns.ListSubscriptionsCommandOutput = {
  $metadata: mMetaData,
};
export const mListSubscriptionsByTopicInput: sns.ListSubscriptionsByTopicCommandInput = {
  TopicArn: 'test-arn',
};
export const mListSubscriptionsByTopicResponse: sns.ListSubscriptionsByTopicCommandOutput = {
  $metadata: mMetaData,
};
export const mConfirmSubscriptionInput: sns.ConfirmSubscriptionCommandInput = {
  Token: 'test-token',
  TopicArn: 'test-arn',
};
export const mConfirmSubscriptionResponse: sns.ConfirmSubscriptionCommandOutput = {
  SubscriptionArn: 'test-arn',
  $metadata: mMetaData,
};
