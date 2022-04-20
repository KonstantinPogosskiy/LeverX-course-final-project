import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { IReaction } from '../../Interfaces/IReaction';
import { IReactionService } from '../../Interfaces/IReactionService';
import { Reaction } from '../../models/reaction/reaction.model';

@Injectable()
export class ReactionService implements IReactionService {
  constructor(
    @InjectModel(Reaction)
    private reactionModel: typeof Reaction,
  ) {
  };

  public async createReaction(payload): Promise<IReaction> {
    return await this.reactionModel.create({
      ...payload,
    });
  }

  public async getAllReactions(): Promise<Reaction[]> {
    return this.reactionModel.findAll();
  }

  public async getOneReaction(id: number): Promise<IReaction> {
    return this.reactionModel.findOne({ where: { reaction_id: id } });
  }

  public async deleteReaction(id: number): Promise<void> {
    await this.reactionModel.destroy({ where: { reaction_id: id } });
  }
}