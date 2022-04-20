import { forwardRef, Module } from '@nestjs/common';
import { RecordService } from './record.service';
import { RecordsController } from './records.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Record } from '../../models/record/records.model';
import { AuthorizationModule } from '../authorization/authorization.module';
import { Purchased } from '../../models/record/bought-records.model';
import { MailService } from '../../mail/mail.service';
import { MailModule } from '../../mail/mail.module';

@Module({
  imports: [
    forwardRef(() => AuthorizationModule),
    SequelizeModule.forFeature([Record, Purchased]),
    MailModule,
  ],
  providers:[RecordService, MailService],
  controllers:[RecordsController],
  exports: [SequelizeModule, MailService]
})

export class RecordsModule {}