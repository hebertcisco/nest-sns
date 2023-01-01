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

### SmsService

This service is responsible for sending SMS messages using AWS SNS.

#### Importing the service

To use the SmsService in your NestJS application, you will need to import it. You can do this by adding the following line to the top of the file where you want to use the service:

```ts
import { SmsService } from 'nest-sns';
```

#### Injecting the service

To use the SmsService, you will need to inject it into your component or controller. You can do this by adding it to the constructor arguments and adding a public or private property for it:

```ts
export class YourComponent {   
 constructor(private smsService: SmsService) {} 
}
```

#### Sending an SMS

To send an SMS using the SmsService, you can call the `sendSMS` method and pass it an object containing the SMS options. The `sendSMS` method returns a Promise that resolves to an object with a `statusCode`, `message`, and `data` properties.

Here is an example of how you can use the `sendSMS` method:

```ts
const smsOptions = {
  phoneNumber: '+1234567890',
  message: 'Hello, this is a test SMS message.'
};

try {
  const response = await this.smsService.sendSMS(smsOptions);
  console.log(response);
} catch (error) {
  console.error(error);
}
```

#### Interfaces

The `SendSMSInput` interface defines the shape of the options object that should be passed to the `sendSMS` method. It contains the following properties:

```ts
export type SendSMSInput = {
  Message: string;
  PhoneNumber: string;
  Subject?: string;
};
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
