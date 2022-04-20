import { IReaction } from './IReaction';
import { Reaction } from '../models/reaction/reaction.model';

export interface IReactionService {
  createReaction(payload): Promise<IReaction>
  getAllReactions(): Promise<Reaction[]>
  getOneReaction(id: number): Promise<IReaction>
  deleteReaction(id: number): void
}