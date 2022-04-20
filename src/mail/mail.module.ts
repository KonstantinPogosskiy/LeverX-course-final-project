import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('mailer.host'),
          port: configService.get<number>('mailer.port'),
          ignoreTLS: true,
          secure: true,
          auth: {
            user: configService.get<string>('mailer.user'),
            pass: configService.get<string>('mailer.password'),
          },
        },
        defaults: {
          from: configService.get<string>('mailer.from'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})

export class MailModule {
}
