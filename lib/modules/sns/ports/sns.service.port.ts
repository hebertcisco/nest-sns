import * as sns from '@aws-sdk/client-sns';

export interface SnsServicePort {
  get client(): sns.SNSClient;

  set client(client: sns.SNSClient);

  get options(): sns.SNSClientConfig;

  set options(options: sns.SNSClientConfig);
  createTopic(input: sns.CreateTopicInput): Promise<sns.CreateTopicResponse>;

  publish(input: sns.PublishInput): Promise<sns.PublishResponse>;
  subscribe(input: sns.SubscribeInput): Promise<sns.SubscribeCommandOutput>;

  unsubscribe(input: sns.UnsubscribeInput): Promise<sns.UnsubscribeCommandOutput>;
  deleteTopic(input: sns.DeleteTopicInput): Promise<sns.DeleteTopicCommandOutput>;

  listTopics(input: sns.ListTopicsInput): Promise<sns.ListTopicsResponse>;
  listSubscriptions(input: sns.ListSubscriptionsInput): Promise<sns.ListSubscriptionsResponse>;
  listSubscriptionsByTopic(input: sns.ListSubscriptionsByTopicInput): Promise<sns.ListSubscriptionsByTopicResponse>;
  confirmSubscription(input: sns.ConfirmSubscriptionInput): Promise<sns.ConfirmSubscriptionResponse>;
}
