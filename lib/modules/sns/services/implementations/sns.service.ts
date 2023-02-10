import { Inject, Injectable, Logger } from '@nestjs/common';

import * as sns from '@aws-sdk/client-sns';

import { SNS_OPTIONS } from '../../common';
import { SnsServicePort } from '../../ports';

@Injectable()
export class SnsService implements SnsServicePort {
  private logger = new Logger(SnsService.name);

  private snsClient!: sns.SNSClient;

  public constructor(@Inject(SNS_OPTIONS) private snsClientConfig: sns.SNSClientConfig) {
    this.initialize();
  }

  public get client(): sns.SNSClient {
    return this.snsClient;
  }

  public set client(client: sns.SNSClient) {
    this.snsClient = client;
  }

  public get options(): sns.SNSClientConfig {
    return this.snsClientConfig;
  }

  public set options(options: sns.SNSClientConfig) {
    this.snsClientConfig = options;
  }

  private initialize(): void {
    this.options = this.snsClientConfig;
    try {
      this.logger.log('Success[initialize]:');
      this.snsClient = new sns.SNSClient({
        ...this.options,
      });
    } catch (error) {
      this.logger.error('Error[initialize]:', error);
      throw error;
    }
  }

  public async createTopic(input: sns.CreateTopicInput): Promise<sns.CreateTopicResponse> {
    try {
      this.logger.log(`Success[createTopic]: ${JSON.stringify(input)}`);
      return this.snsClient.send(new sns.CreateTopicCommand(input));
    } catch (error) {
      this.logger.error('Error[createTopic]:', error);
      throw error;
    }
  }

  public async publish(input: sns.PublishInput): Promise<sns.PublishResponse> {
    try {
      this.logger.log(`Success[publish]: ${JSON.stringify(input)}`);
      return this.snsClient.send(new sns.PublishCommand(input));
    } catch (error) {
      this.logger.error('Error[publish]:', error);
      throw error;
    }
  }
  public async subscribe(input: sns.SubscribeInput): Promise<sns.SubscribeCommandOutput> {
    try {
      this.logger.log(`Success[subscribe]: ${JSON.stringify(input)}`);
      return this.snsClient.send(new sns.SubscribeCommand(input));
    } catch (error) {
      this.logger.error('Error[subscribe]:', error);
      throw error;
    }
  }

  public async unsubscribe(input: sns.UnsubscribeInput): Promise<sns.UnsubscribeCommandOutput> {
    try {
      this.logger.log(`Success[unsubscribe]: ${JSON.stringify(input)}`);
      return this.snsClient.send(new sns.UnsubscribeCommand(input));
    } catch (error) {
      this.logger.error('Error[unsubscribe]:', error);
      throw error;
    }
  }
  public async deleteTopic(input: sns.DeleteTopicInput): Promise<sns.DeleteTopicCommandOutput> {
    try {
      this.logger.log(`Success[deleteTopic]: ${JSON.stringify(input)}`);
      return this.snsClient.send(new sns.DeleteTopicCommand(input));
    } catch (error) {
      this.logger.error('Error[deleteTopic]:', error);
      throw error;
    }
  }

  public async listTopics(input: sns.ListTopicsInput): Promise<sns.ListTopicsResponse> {
    try {
      this.logger.log(`Success[listTopics]: ${JSON.stringify(input)}`);
      return this.snsClient.send(new sns.ListTopicsCommand(input));
    } catch (error) {
      this.logger.error('Error[listTopics]:', error);
      throw error;
    }
  }
  public async listSubscriptions(input: sns.ListSubscriptionsInput): Promise<sns.ListSubscriptionsResponse> {
    try {
      this.logger.log(`Success[listSubscriptions]: ${JSON.stringify(input)}`);
      return this.snsClient.send(new sns.ListSubscriptionsCommand(input));
    } catch (error) {
      this.logger.error('Error[listSubscriptions]:', error);
      throw error;
    }
  }
  public async listSubscriptionsByTopic(
    input: sns.ListSubscriptionsByTopicInput,
  ): Promise<sns.ListSubscriptionsByTopicResponse> {
    try {
      this.logger.log(`Success[listSubscriptionsByTopic]: ${JSON.stringify(input)}`);
      return this.snsClient.send(new sns.ListSubscriptionsByTopicCommand(input));
    } catch (error) {
      this.logger.error('Error[listSubscriptionsByTopic]:', error);
      throw error;
    }
  }
  public async confirmSubscription(input: sns.ConfirmSubscriptionInput): Promise<sns.ConfirmSubscriptionResponse> {
    try {
      this.logger.log(`Success[confirmSubscription]: ${JSON.stringify(input)}`);
      return this.snsClient.send(new sns.ConfirmSubscriptionCommand(input));
    } catch (error) {
      this.logger.error('Error[confirmSubscription]:', error);
      throw error;
    }
  }
}
