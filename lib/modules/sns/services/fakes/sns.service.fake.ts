import { Injectable } from '@nestjs/common';

import * as sns from '@aws-sdk/client-sns';

import * as fixtures from '../../common';
import { SnsServicePort } from '../../ports';

@Injectable()
export class SnsServiceFake implements SnsServicePort {
  public async createTopic(input: sns.CreateTopicInput): Promise<sns.CreateTopicResponse> {
    return Promise.resolve(fixtures.mCreateTopicReponse);
  }

  public async publish(input: sns.PublishInput): Promise<sns.PublishResponse> {
    return Promise.resolve(fixtures.mPublishResponse);
  }
  public async subscribe(input: sns.SubscribeInput): Promise<sns.SubscribeCommandOutput> {
    return Promise.resolve(fixtures.mSubscribeResponse);
  }

  public async unsubscribe(input: sns.UnsubscribeInput): Promise<sns.UnsubscribeCommandOutput> {
    return Promise.resolve(fixtures.mUnsubscribeResponse);
  }
  public async deleteTopic(input: sns.DeleteTopicInput): Promise<sns.DeleteTopicCommandOutput> {
    return Promise.resolve(fixtures.mDeleteTopicResponse);
  }

  public async listTopics(input: sns.ListTopicsInput): Promise<sns.ListTopicsResponse> {
    return Promise.resolve(fixtures.mListTopicsResponse);
  }
  public async listSubscriptions(input: sns.ListSubscriptionsInput): Promise<sns.ListSubscriptionsResponse> {
    return Promise.resolve(fixtures.mListSubscriptionsResponse);
  }
  public async listSubscriptionsByTopic(
    input: sns.ListSubscriptionsByTopicInput,
  ): Promise<sns.ListSubscriptionsByTopicResponse> {
    return Promise.resolve(fixtures.mListSubscriptionsByTopicResponse);
  }
  public async confirmSubscription(input: sns.ConfirmSubscriptionInput): Promise<sns.ConfirmSubscriptionResponse> {
    return Promise.resolve(fixtures.mConfirmSubscriptionResponse);
  }

  get client(): sns.SNSClient {
    return {
      send: jest.fn(),
    } as unknown as sns.SNSClient;
  }

  get options(): sns.SNSClientConfig {
    return {
      region: 'us-east-1',
    };
  }
}
