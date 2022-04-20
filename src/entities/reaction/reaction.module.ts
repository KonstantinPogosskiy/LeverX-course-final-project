import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Reaction } from '../../models/reaction/reaction.model';
import { ReactionService } from './reaction.service';
import { ReactionController } from './reaction.controller';
import { AuthorizationModule } from '../authorization/authorization.module';

@Module({
  imports: [
    forwardRef(() => AuthorizationModule),
    SequelizeModule.forFeature([Reaction]),
  ],
  providers: [ReactionService],
  controllers: [ReactionController],
  exports: [SequelizeModule],
})

export class ReactionModule {
}