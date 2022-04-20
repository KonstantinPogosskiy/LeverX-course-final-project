import { forwardRef, Module } from '@nestjs/common';
import { AuthorizationService } from './authorization.service';
import { AuthorizationController } from './authorization.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ProfileService } from '../profile/profile.service';
import { UserService } from '../user/user.service';
import { ProfileModule } from '../profile/profile.module';
import { RoleModule } from '../role/role.module';
import { RoleService } from '../role/role.service';


@Module({
  providers: [AuthorizationService, ProfileService, UserService, RoleService],
  controllers: [AuthorizationController],
  exports: [AuthorizationService, ProfileService, UserService, RoleService, JwtModule],
  imports: [
    forwardRef(() => UserModule),
    RoleModule,
    ProfileModule,
    JwtModule.register({
      secret: 'SECRET',
      signOptions: {
        expiresIn: '24h',
      },
    }),
  ],
})

export class AuthorizationModule {
}