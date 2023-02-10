import { defineFeature, loadFeature } from 'jest-cucumber';

import * as sns from '@aws-sdk/client-sns';
import { Test, TestingModule } from '@nestjs/testing';

import { SnsService } from '../services';
import { SNS_OPTIONS } from '../common';

import * as fixtures from '../common';
import { SnsServiceFake } from '../services';
import { SnsServicePort } from '../ports';

const feature = loadFeature('lib/modules/sns/__tests__/sns.service.feature');

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
defineFeature(feature, (test) => {
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

  test('Create Topic', ({ given, when, then }) => {
    let result: sns.CreateTopicResponse;

    given('I have a SNS client', () => {
      expect(service).toBeDefined();
    });

    when('I create a topic', async () => {
      result = await service.createTopic(fixtures.mCreateTopicInput);
    });

    then('I should get a topic ARN', () => {
      expect(result).toEqual(fixtures.mCreateTopicReponse);
    });
  });

  test('Publish Message', ({ given, when, then }) => {
    let result: sns.PublishResponse;

    given('I have a SNS client', () => {
      expect(service).toBeDefined();
    });

    when('I publish a message', async () => {
      result = await service.publish(fixtures.mPublishInput);
    });

    then('I should get a message ID', () => {
      expect(result).toEqual(fixtures.mPublishResponse);
    });
  });

  test('Subscribe', ({ given, when, then }) => {
    let result: sns.SubscribeResponse;

    given('I have a SNS client', () => {
      expect(service).toBeDefined();
    });

    when('I subscribe', async () => {
      result = await service.subscribe(fixtures.mSubscribeInput);
    });

    then('I should get a subscription ARN', () => {
      expect(result).toEqual(fixtures.mSubscribeResponse);
    });
  });

  test('Unsubscribe', ({ given, when, then }) => {
    let result: sns.UnsubscribeCommandOutput;

    given('I have a SNS client', () => {
      expect(service).toBeDefined();
    });

    when('I unsubscribe', async () => {
      result = await service.unsubscribe(fixtures.mUnsubscribeInput);
    });

    then('I should get a subscription ARN', () => {
      expect(result).toEqual(fixtures.mUnsubscribeResponse);
    });
  });

  test('Delete Topic', ({ given, when, then }) => {
    let result: sns.DeleteTopicCommandOutput;

    given('I have a SNS client', () => {
      expect(service).toBeDefined();
    });

    when('I delete a topic', async () => {
      result = await service.deleteTopic(fixtures.mDeleteTopicInput);
    });

    then('I should get a topic ARN', () => {
      expect(result).toEqual(fixtures.mDeleteTopicResponse);
    });
  });

  test('List Topics', ({ given, when, then }) => {
    let result: sns.ListTopicsResponse;

    given('I have a SNS client', () => {
      expect(service).toBeDefined();
    });

    when('I list topics', async () => {
      result = await service.listTopics(fixtures.mListTopicsInput);
    });

    then('I should get a list of topics', () => {
      expect(result).toEqual(fixtures.mListTopicsResponse);
    });
  });

  test('List Subscriptions', ({ given, when, then }) => {
    let result: sns.ListSubscriptionsResponse;

    given('I have a SNS client', () => {
      expect(service).toBeDefined();
    });

    when('I list subscriptions', async () => {
      result = await service.listSubscriptions(fixtures.mListSubscriptionsInput);
    });

    then('I should get a list of subscriptions', () => {
      expect(result).toEqual(fixtures.mListSubscriptionsResponse);
    });
  });

  test('List Subscriptions By Topic', ({ given, when, then }) => {
    let result: sns.ListSubscriptionsByTopicResponse;

    given('I have a SNS client', () => {
      expect(service).toBeDefined();
    });

    when('I list subscriptions by topic', async () => {
      result = await service.listSubscriptionsByTopic(fixtures.mListSubscriptionsByTopicInput);
    });

    then('I should get a list of subscriptions by topic', () => {
      expect(result).toEqual(fixtures.mListSubscriptionsByTopicResponse);
    });
  });

  test('Confirm Subscription', ({ given, when, then }) => {
    let result: sns.ConfirmSubscriptionResponse;

    given('I have a SNS client', () => {
      expect(service).toBeDefined();
    });

    when('I confirm subscription', async () => {
      result = await service.confirmSubscription(fixtures.mConfirmSubscriptionInput);
      expect(result).toEqual(fixtures.mConfirmSubscriptionResponse);
    });
    then('I should get a subscription ARN', () => {
      expect(result).toEqual(fixtures.mConfirmSubscriptionResponse);
    });
  });
});
