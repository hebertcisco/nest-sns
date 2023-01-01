# SmsService

This service is responsible for sending SMS messages using AWS SNS.

## Importing the service

To use the SmsService in your NestJS application, you will need to import it. You can do this by adding the following line to the top of the file where you want to use the service:

```ts
import { SmsService } from 'nest-sns';
```

## Injecting the service

To use the SmsService, you will need to inject it into your component or controller. You can do this by adding it to the constructor arguments and adding a public or private property for it:

```ts
export class YourComponent {   
 constructor(private smsService: SmsService) {} 
}
```

## Sending an SMS

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

## Interfaces

The `SendSMSInput` interface defines the shape of the options object that should be passed to the `sendSMS` method. It contains the following properties:

```ts
export type SendSMSInput = {
  Message: string;
  PhoneNumber: string;
  Subject?: string;
};
```
