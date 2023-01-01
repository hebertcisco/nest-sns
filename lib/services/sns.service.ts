import { BadRequestException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';

import * as sns from '@aws-sdk/client-sns';

import { CreateTopicCommand, PublishCommand, SubscribeCommand } from '@aws-sdk/client-sns';

import type { SNSClient, SNSClientConfig } from '@aws-sdk/client-sns';

import { SNS_OPTIONS } from '../constants/sns.constants';

import * as snsTypes from '../types/sns.types';
import type { SendSMSInput } from '../types/sns.types';

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

  public async createTopic(input: snsTypes.CreateTopicInput): Promise<snsTypes.CreateTopicResponse> {
    try {
      this.logger.log(`Success[createTopic]: ${JSON.stringify(input)}`);
      return this.snsClient.send(new CreateTopicCommand(input));
    } catch (error) {
      this.logger.error('Error[createTopic]:', error);
      throw error;
    }
  }

  public async publish(input: snsTypes.PublishInput): Promise<snsTypes.PublishResponse> {
    try {
      this.logger.log(`Success[publish]: ${JSON.stringify(input)}`);
      return this.snsClient.send(new PublishCommand(input));
    } catch (error) {
      this.logger.error('Error[publish]:', error);
      throw error;
    }
  }
  public async subscribe(input: snsTypes.SubscribeInput) {
    try {
      this.logger.log(`Success[subscribe]: ${JSON.stringify(input)}`);
      return this.snsClient.send(new SubscribeCommand(input));
    } catch (error) {
      this.logger.error('Error[subscribe]:', error);
      throw error;
    }
  }

  public async sendSMS(smsOptions: SendSMSInput) {
    const smsSent = await this.publish(smsOptions);
    try {
      this.logger.log(`Success[sendSms]: ${JSON.stringify(smsSent)}`);
      return {
        statusCode: HttpStatus.OK,
        message: 'Sms sent',
        data: smsSent,
      };
    } catch (error) {
      this.logger.error('Error[sendSms]:', error);
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Failed to send',
        data: error,
        error: error,
      });
    }
  }
}
