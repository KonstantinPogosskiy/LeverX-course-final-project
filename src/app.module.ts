import { Module } from '@nestjs/common';
import { AuthorizationModule } from './entities/authorization/authorization.module';
import { RecordsModule } from './entities/records/records.module';
import { ProfileModule } from './entities/profile/profile.module';
import { UserModule } from './entities/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailModule } from './mail/mail.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user/user.model';
import { Profile } from './models/profile/profile.model';
import { Record } from './models/record/records.model';
import { AppService } from './entities/SSOAuth/app.service';
import { GoogleStrategy } from './entities/SSOAuth/google.strategy';
import { Role } from './models/role/role.model';
import { RoleModule } from './entities/role/role.module';
import { UserRoles } from './models/role/user-roles.model';
import { Reaction } from './models/reaction/reaction.model';
import { ReactionModule } from './entities/reaction/reaction.module';
import { StripeModule } from './stripe/stripe.module';
import { AppController } from './entities/SSOAuth/app.controller';
import { Purchased } from './models/record/bought-records.model';
import configuration from './config/configuration';

@Module({
  imports: [
    StripeModule.forRoot('sk_test_51KdeOgHPxc0ypxONFmYfr5N1SbjUZgtEcjLnXnlS42iFfia4WBBdsraDIy5rbDKwttxgFItHG2uNdm9CGKE01KVi00azfLYUNR', { apiVersion: '2020-08-27' }),
    SequelizeModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.user'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.db'),
        models: [User, Profile, Record, Reaction, Role, UserRoles, Purchased],
        autoLoadModels: true,
      }),
      inject: [ConfigService],
    }),

    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    AuthorizationModule,
    RecordsModule,
    ReactionModule,
    ProfileModule,
    UserModule,
    MailModule,
    ConfigModule,
    RoleModule,
  ],
  controllers: [AppController],
  providers: [AppService, GoogleStrategy],
})

export class AppModule {
}