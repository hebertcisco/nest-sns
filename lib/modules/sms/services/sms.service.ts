import { HttpStatus, Injectable } from '@nestjs/common';

import { BadRequestException, Logger } from '@nestjs/common';

import { SnsService } from '../../sns/services';

import type { SendSMSInput } from '../contract';

@Injectable()
export class SmsService {
  private logger = new Logger(SmsService.name);
  public constructor(private snsService: SnsService) {}
  public async sendSMS(smsOptions: SendSMSInput) {
    const smsSent = await this.snsService.publish(smsOptions);
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
