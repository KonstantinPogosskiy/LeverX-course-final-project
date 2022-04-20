import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../../models/user/user.model';
import { Role } from '../../models/role/role.model';
import { UserRoles } from '../../models/role/user-roles.model';
import { RoleModule } from '../role/role.module';
import { AuthorizationModule } from '../authorization/authorization.module';

@Module({
  imports: [
    forwardRef(() => AuthorizationModule),
    SequelizeModule.forFeature([User, Role, UserRoles]),
    RoleModule,
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService, SequelizeModule],
})

export class UserModule {
}