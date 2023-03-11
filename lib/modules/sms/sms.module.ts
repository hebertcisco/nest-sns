import { forwardRef, Module } from '@nestjs/common';

import { SmsService } from '.';
import { SnsService } from '../sns/services/implementations/sns.service';
import { SnsModule } from '../sns/sns.module';

@Module({
  imports: [forwardRef(() => SnsModule)],
  providers: [SnsService, SmsService],
  exports: [SmsService],
})
export class SmsModule {}
