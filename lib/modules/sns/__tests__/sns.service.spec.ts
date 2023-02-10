import { Test, TestingModule } from '@nestjs/testing';
import * as sns from '@aws-sdk/client-sns';

import { SnsService, SnsServiceFake } from '../services';
import { mPublishCommand, SNS_OPTIONS } from '../common';

import * as fixtures from '../common';
import { SnsServicePort } from '../ports';

jest.mock('@aws-sdk/client-sns', () => {
  const mSns = {
    send: jest.fn(),
  };
  return {
    SNSClient: jest.fn(() => mSns),
    PublishCommand: jest.fn(() => fixtures.mPublishCommand),
    CreateTopicCommand: jest.fn(() => fixtures.mCreateTopicReponse),
  };
});

describe('SnsService', () => {
  let service: SnsServicePort;

  beforeAll(async () => {
    jest.resetAllMocks();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: SnsService,
          useClass: SnsServiceFake,
        },
        {
          provide: SNS_OPTIONS,
          useValue: {
            region: 'us-east-1',
          },
        },
      ],
    }).compile();

    service = module.get<SnsServicePort>(SnsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a topic', async () => {
    const result = await service.createTopic(fixtures.mCreateTopicInput);
    expect(result).toEqual(fixtures.mCreateTopicReponse);
  });

  it('should publish a message', async () => {
    const result = await service.publish(fixtures.mPublishInput);
    expect(result).toEqual(fixtures.mPublishResponse);
  });

  it('should subscribe a topic', async () => {
    const result = await service.subscribe(fixtures.mSubscribeInput);
    expect(result).toEqual(fixtures.mSubscribeResponse);
  });

  it('should unsubscribe a topic', async () => {
    const result = await service.unsubscribe(fixtures.mUnsubscribeInput);
    expect(result).toEqual(fixtures.mUnsubscribeResponse);
  });

  it('should delete a topic', async () => {
    const result = await service.deleteTopic(fixtures.mDeleteTopicInput);

    expect(result).toEqual(fixtures.mDeleteTopicResponse);
  });

  it('should list subscriptions', async () => {
    const result = await service.listSubscriptions(fixtures.mListSubscriptionsInput);
    expect(result).toEqual(fixtures.mListSubscriptionsResponse);
  });

  it('should list topics', async () => {
    const result = await service.listTopics(fixtures.mListTopicsInput);
    expect(result).toEqual(fixtures.mListTopicsResponse);
  });

  it('should list subscriptions by topic', async () => {
    const result = await service.listSubscriptionsByTopic(fixtures.mListSubscriptionsByTopicInput);
    expect(result).toEqual(fixtures.mListSubscriptionsByTopicResponse);
  });
});
