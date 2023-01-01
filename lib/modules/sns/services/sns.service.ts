import { Inject, Injectable, Logger } from '@nestjs/common';

import * as sns from '@aws-sdk/client-sns';

import { CreateTopicCommand, PublishCommand, SubscribeCommand } from '@aws-sdk/client-sns';

import type { SNSClient, SNSClientConfig } from '@aws-sdk/client-sns';

import { SNS_OPTIONS } from '../common/constants';

import type {
  CreateTopicInput,
  CreateTopicResponse,
  PublishInput,
  PublishResponse,
  SubscribeCommandOutput,
  SubscribeInput,
} from '../contract';

@Injectable()
export class SnsService {
  private logger = new Logger(SnsService.name);

  private snsClient!: SNSClient;

  public constructor(@Inject(SNS_OPTIONS) private snsClientConfig: SNSClientConfig) {
    this.initialize();
  }

  public get client(): SNSClient {
    return this.snsClient;
  }

  public set client(client: SNSClient) {
    this.snsClient = client;
  }

  public get options(): SNSClientConfig {
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

  public async createTopic(input: CreateTopicInput): Promise<CreateTopicResponse> {
    try {
      this.logger.log(`Success[createTopic]: ${JSON.stringify(input)}`);
      return this.snsClient.send(new CreateTopicCommand(input));
    } catch (error) {
      this.logger.error('Error[createTopic]:', error);
      throw error;
    }
  }

  public async publish(input: PublishInput): Promise<PublishResponse> {
    try {
      this.logger.log(`Success[publish]: ${JSON.stringify(input)}`);
      return this.snsClient.send(new PublishCommand(input));
    } catch (error) {
      this.logger.error('Error[publish]:', error);
      throw error;
    }
  }
  public async subscribe(input: SubscribeInput): Promise<SubscribeCommandOutput> {
    try {
      this.logger.log(`Success[subscribe]: ${JSON.stringify(input)}`);
      return this.snsClient.send(new SubscribeCommand(input));
    } catch (error) {
      this.logger.error('Error[subscribe]:', error);
      throw error;
    }
  }
}
