import { forwardRef, Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { UserModule } from '../user/user.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Profile } from '../../models/profile/profile.model';
import { AuthorizationModule } from '../authorization/authorization.module';

@Module({
  imports: [
    forwardRef(() => AuthorizationModule),
    SequelizeModule.forFeature([Profile]),
    UserModule,
  ],
  providers: [ProfileService, SequelizeModule],
  controllers: [ProfileController],
  exports: [ProfileService, SequelizeModule],
})

export class ProfileModule {
}