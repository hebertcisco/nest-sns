# SnsService

This service is a wrapper for the AWS SNS client, which allows you to create, publish, and subscribe to AWS SNS topics.

## Importing the service

To use the SnsService in your NestJS application, you will need to import it. You can do this by adding the following line to the top of the file where you want to use the service:

```ts
import { SnsService } from 'nest-sns';
```

## Injecting the service

To use the SnsService, you will need to inject it into your component or controller. You can do this by adding it to the constructor arguments and adding a public or private property for it:

```ts
export class YourComponent {
  constructor(private snsService: SnsService) {}
}
```

## Creating an SNS Topic

To create an SNS topic using the SnsService, you can call the `createTopic` method and pass it an object containing the topic options. The `createTopic` method returns a Promise that resolves to an object with the `TopicArn` property, which is the Amazon Resource Name (ARN) of the created topic.

Here is an example of how you can use the `createTopic` method:

```ts
const topicOptions = {
  Name: 'my-topic'
};

try {
  const response = await this.snsService.createTopic(topicOptions);
  console.log(response);
} catch (error) {
  console.error(error);
}
```

## Publishing to an SNS Topic

To publish a message to an SNS topic using the SnsService, you can call the `publish` method and pass it an object containing the publish options. The `publish` method returns a Promise that resolves to an object with the `MessageId` property, which is the ID of the message that was published.

Here is an example of how you can use the `publish` method:

```ts
const publishOptions = {
  TopicArn: 'arn:aws:sns:region:account-id:my-topic',
  Message: 'Hello, this is a test message.'
};

try {
  const response = await this.snsService.publish(publishOptions);
  console.log(response);
} catch (error) {
  console.error(error);
}
```

## Subscribing to an SNS Topic

To subscribe to an SNS topic using the SnsService, you can call the `subscribe` method and pass it an object containing the subscribe options. The `subscribe` method returns a Promise that resolves to an object with the `SubscriptionArn` property, which is the ARN of the subscription.

Here is an example of how you can use the `subscribe` method:

```ts
const subscribeOptions = {
  TopicArn: 'arn:aws:sns:region:account-id:my-topic',
  Protocol: 'email',
  Endpoint: 'my-email@example.com'
};

try {
  const response = await this.snsService.subscribe(subscribeOptions);
  console.log(response);
} catch (error) {
  console.error(error);
}
```

## Interfaces

The `CreateTopicInput` interface defines the shape of the options object that should be passed to the `createTopic` method. It contains the following properties:

```ts
export interface CreateTopicInput {
  Name: string;
}
```

The `PublishInput` interface defines the shape of the options object that should be passed to the `publish` method. It contains the following properties:

```ts
export interface PublishInput {
  TopicArn: string;
  Message: string;
  Subject?: string;
}
```

The `SubscribeInput` interface defines the shape of the options object that should be passed to the `subscribe` method. It contains the following properties:

```ts
export interface SubscribeInput {
  TopicArn: string;
  Protocol: string;
  Endpoint: string;
}
```
