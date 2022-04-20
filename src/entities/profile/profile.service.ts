import { Injectable } from '@nestjs/common';
import { IProfile } from '../../Interfaces/IProfile';
import { IProfileService } from '../../Interfaces/IProfileService';
import { InjectModel } from '@nestjs/sequelize';
import { Profile } from '../../models/profile/profile.model';
import { Record } from '../../models/record/records.model';

@Injectable()
export class ProfileService implements IProfileService {

  constructor(
    @InjectModel(Profile)
    private profileModel: typeof Profile,
  ) {
  };

  public async createProfile(payload): Promise<IProfile> {
    return await this.profileModel.create({
      ...payload,
    });
  }

  public async getProfileById(id: number): Promise<IProfile> {
    return this.profileModel.findOne({ where: { profile_id: id }, include: { model: Record } });
  }

  public async updateProfile(id: number, user_id: number, firstName?: string, lastName?: string): Promise<void> {
    await this.profileModel.update({ firstName: firstName, lastName: lastName }, { where: { profile_id: id } });
  };

  public async accessToProfile(id: number): Promise<IProfile> {
    return this.profileModel.findOne({ where: { profile_id: id } });
  }
}
