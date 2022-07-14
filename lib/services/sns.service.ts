import { Inject, Injectable } from '@nestjs/common';
import * as sns from '@aws-sdk/client-sns';
import {
  CreateTopicCommand,
  PublishCommand,
  SubscribeCommand,
} from '@aws-sdk/client-sns';
import { SNS_OPTIONS } from '../constants/sns.constants';

import * as snsTypes from '../types/sns.types';

@Injectable()
export class SnsService {
  public snsClient: sns.SNSClient;

  constructor(@Inject(SNS_OPTIONS) private options: sns.SNSClientConfig) {
    this.initialize();
  }

  private initialize(): void {
    try {
      this.snsClient = new sns.SNSClient({
        ...this.options,
      });
    } catch (error) {
      throw error;
    }
  }

  public async createTopic(
    input: snsTypes.CreateTopicInput,
  ): Promise<snsTypes.CreateTopicResponse> {
    return this.snsClient.send(new CreateTopicCommand(input));
  }

  public async publish(
    input: snsTypes.PublishInput,
  ): Promise<snsTypes.PublishResponse> {
    return this.snsClient.send(new PublishCommand(input));
  }
  public async subscribe(input: snsTypes.SubscribeInput) {
    try {
      return this.snsClient.send(new SubscribeCommand(input));
    } catch (error) {
      throw error;
    }
  }
}
