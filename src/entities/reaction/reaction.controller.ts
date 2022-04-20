import { Body, Controller, Delete, Get, Param, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ReactionService } from './reaction.service';
import { ReactionDto } from './dto/reaction.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Reaction } from '../../models/reaction/reaction.model';
import { JwtAuthGuard } from '../authorization/jwt.auth.guard';
import { Roles } from '../authorization/roles-auth.decorator';
import { RolesGuard } from '../authorization/roles.guard';

@ApiTags('Reactions')
@Controller('reactions')
export class ReactionController {
  constructor(private reactionService: ReactionService) {
  }

  @ApiOperation({ summary: 'Creating reaction' })
  @ApiResponse({ status: 200, type: Reaction })
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Post()
  createReaction(@Body() createReaction: ReactionDto) {
    return this.reactionService.createReaction(createReaction);
  }

  @ApiOperation({ summary: 'Getting all reaction' })
  @ApiResponse({ status: 200, type: [Reaction] })
  @UseGuards(JwtAuthGuard)
  @Get()
  getAllReactions() {
    return this.reactionService.getAllReactions();
  }

  @ApiOperation({ summary: 'Getting reaction by ID' })
  @ApiResponse({ status: 200, type: Reaction })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getOneReaction(@Param() params) {
    return this.reactionService.getOneReaction(params);
  }

  @ApiOperation({ summary: 'Delete reaction' })
  @ApiResponse({ status: 200, type: Reaction })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Delete(':id')
  deleteReaction(@Param() params) {
    return this.reactionService.deleteReaction(+params.id);
  }
}