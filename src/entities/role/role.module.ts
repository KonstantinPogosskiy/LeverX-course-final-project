import { forwardRef, Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from '../../models/role/role.model';
import { User } from '../../models/user/user.model';
import { UserRoles } from '../../models/role/user-roles.model';
import { AuthorizationModule } from '../authorization/authorization.module';


@Module({
  imports: [
    forwardRef(() => AuthorizationModule),
    SequelizeModule.forFeature([Role, User, UserRoles]),
  ],
  providers: [RoleService],
  controllers: [RoleController],
  exports: [RoleService, SequelizeModule],
})

export class RoleModule {
}