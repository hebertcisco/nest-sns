# SnsModule

The SnsModule is a module that provides the `SnsService` and `SmsService` for sending SMS messages using AWS SNS.

## Importing the module

To use the SnsModule in your NestJS application, you will need to import it. You can do this by adding the following line to the top of the file where you want to use the module:

```js
import { SnsModule } from 'nest-sns';
```

## Registering the module

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

## Using the module

To use the SnsModule, you will need to inject the `SnsService` or `SmsService` into your component or controller. You can do this by adding it to the constructor arguments and adding a public or private property for it:

```js
export class YourComponent {
  constructor(private snsService: SnsService) {}
}
```

You can then use the `snsService` or `smsService` to perform the necessary operations, such as creating an SNS topic, publishing to a topic, or subscribing to a topic.
