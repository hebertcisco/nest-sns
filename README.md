[![CircleCI](https://dl.circleci.com/status-badge/img/gh/hebertcisco/nest-sns/tree/main.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/hebertcisco/nest-sns/tree/main)

[![Node.js build and publish package](https://github.com/hebertcisco/nest-sns/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/hebertcisco/nest-sns/actions/workflows/npm-publish.yml)

[![Running Code Coverage](https://github.com/hebertcisco/nest-sns/actions/workflows/coverage.yml/badge.svg)](https://github.com/hebertcisco/nest-sns/actions/workflows/coverage.yml)

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Nestjs](https://img.shields.io/badge/Nestjs-ea2845?style=flat&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![Free. Built on open source. Runs everywhere.](https://img.shields.io/badge/VS_Code-0078D4?style=flat&logo=visual%20studio%20code&logoColor=white)](https://code.visualstudio.com/)
[![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=flat&logo=githubactions&logoColor=white)](https://github.com/hebertcisco/nest-sns/actions)

> Amazon Simple Notification Service module 🌐

## Installation

> Install with yarn or npm: `yarn` or `npm`:

```bash
# yarn
yarn add nest-sns
```

```bash
# npm
npm i nest-sns --save
```

```bash
# pnpm
pnpm add nest-sns --save
```

## Usage

### SnsModule

The SnsModule is a module that provides the `SnsService` and `SmsService` for sending SMS messages using AWS SNS.

#### Importing the module

To use the SnsModule in your NestJS application, you will need to import it. You can do this by adding the following line to the top of the file where you want to use the module:

```js
import { SnsModule } from 'nest-sns';
```

#### Registering the module

To use the SnsModule, you will need to register it and provide the necessary AWS SNS credentials. You can do this by calling the `register` method and passing it an object containing the `credentials` property. The `register` method returns an object that you can use to include the module in the `imports` array of the root AppModule or the module where you want to use it.

Here is an example of how you can register the SnsModule:

```js
SnsModule.register({
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
});
```

#### Using the module

To use the SnsModule, you will need to inject the `SnsService` or `SmsService` into your component or controller. You can do this by adding it to the constructor arguments and adding a public or private property for it:

```js
export class YourComponent {
  constructor(private snsService: SnsService) {}
}
```

You can then use the `snsService` or `smsService` to perform the necessary operations, such as creating an SNS topic, publishing to a topic, or subscribing to a topic.

### SmsService

This service is responsible for sending SMS messages using AWS SNS.

#### Importing the SmsService

To use the SmsService in your NestJS application, you will need to import it. You can do this by adding the following line to the top of the file where you want to use the service:

```js
import { SmsService } from 'nest-sns';
```

#### Injecting the SmsService

To use the SmsService, you will need to inject it into your component or controller. You can do this by adding it to the constructor arguments and adding a public or private property for it:

```js
export class YourComponent {   
 constructor(private smsService: SmsService) {} 
}
```

#### Sending an SMS

To send an SMS using the SmsService, you can call the `sendSMS` method and pass it an object containing the SMS options. The `sendSMS` method returns a Promise that resolves to an object with a `statusCode`, `message`, and `data` properties.

Here is an example of how you can use the `sendSMS` method:

```js
const smsOptions = {
  PhoneNumber: '+1234567890',
  Message: 'Hello, this is a test SMS message.'
};

try {
  const response = await this.smsService.sendSMS(smsOptions);
  console.log(response);
} catch (error) {
  console.error(error);
}
```

#### Interfaces and Types

The `SendSMSInput` interface defines the shape of the options object that should be passed to the `sendSMS` method. It contains the following properties:

```js
export type SendSMSInput = {
  Message: string;
  PhoneNumber: string;
  Subject?: string;
};
```

### SnsService

This service is a wrapper for the AWS SNS client, which allows you to create, publish, and subscribe to AWS SNS topics.

#### Importing the SnsService

To use the SnsService in your NestJS application, you will need to import it. You can do this by adding the following line to the top of the file where you want to use the service:

```js
import { SnsService } from 'nest-sns';
```

#### Injecting the SnsService

To use the SnsService, you will need to inject it into your component or controller. You can do this by adding it to the constructor arguments and adding a public or private property for it:

```js
export class YourComponent {
  constructor(private snsService: SnsService) {}
}
```

#### Creating an SNS Topic

To create an SNS topic using the SnsService, you can call the `createTopic` method and pass it an object containing the topic options. The `createTopic` method returns a Promise that resolves to an object with the `TopicArn` property, which is the Amazon Resource Name (ARN) of the created topic.

Here is an example of how you can use the `createTopic` method:

```js
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

#### Publishing to an SNS Topic

To publish a message to an SNS topic using the SnsService, you can call the `publish` method and pass it an object containing the publish options. The `publish` method returns a Promise that resolves to an object with the `MessageId` property, which is the ID of the message that was published.

Here is an example of how you can use the `publish` method:

```js
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

#### Subscribing to an SNS Topic

To subscribe to an SNS topic using the SnsService, you can call the `subscribe` method and pass it an object containing the subscribe options. The `subscribe` method returns a Promise that resolves to an object with the `SubscriptionArn` property, which is the ARN of the subscription.

Here is an example of how you can use the `subscribe` method:

```js
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

#### Interfaces for SNS Options

The `CreateTopicInput` interface defines the shape of the options object that should be passed to the `createTopic` method. It contains the following properties:

```js
export interface CreateTopicInput {
  Name: string;
}
```

The `PublishInput` interface defines the shape of the options object that should be passed to the `publish` method. It contains the following properties:

```js
export interface PublishInput {
  TopicArn: string;
  Message: string;
  Subject?: string;
}
```

The `SubscribeInput` interface defines the shape of the options object that should be passed to the `subscribe` method. It contains the following properties:

```js
export interface SubscribeInput {
  TopicArn: string;
  Protocol: string;
  Endpoint: string;
}
```

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](issues).

## Show your support

Give a ⭐️ if this project helped you!

Or buy me a coffee 🙌🏾

<a href="https://www.buymeacoffee.com/hebertcisco">
    <img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=hebertcisco&button_colour=FFDD00&font_colour=000000&font_family=Inter&outline_colour=000000&coffee_colour=ffffff" />
</a>

## 📝 License

Copyright © 2023 [Hebert F Barros](https://github.com/hebertcisco).<br />
This project is [MIT](LICENSE) licensed.
