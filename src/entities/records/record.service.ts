import { Injectable } from '@nestjs/common';
import { IRecord } from '../../Interfaces/IRecord';
import { IRecordService } from '../../Interfaces/IRecordService';
import { InjectModel } from '@nestjs/sequelize';
import { Record } from '../../models/record/records.model';
import { Purchased } from '../../models/record/bought-records.model';

@Injectable()
export class RecordService implements IRecordService {

  constructor(
    @InjectModel(Record)
    private recordModel: typeof Record,
    @InjectModel(Purchased)
    private purchasedModel: typeof Purchased,
  ) {
  };

  public async createRecord(payload): Promise<IRecord> {
    return await this.recordModel.create({
      ...payload,
    });
  };

  public async getRecordById(id: number): Promise<IRecord> {
    return this.recordModel.findOne({ where: { record_id: id }, include: { all: true } });
  };

  public async getRecordByAuthor(author: string): Promise<IRecord[]> {
    return this.recordModel.findAll({ where: { author: author }, include: { all: true } });
  }

  public async getRecordByName(name: string): Promise<IRecord[]> {
    return this.recordModel.findAll({ where: { name: name }, include: { all: true } });
  }

  public async getAllRecords(): Promise<IRecord[]> {
    return this.recordModel.findAll({ include: { all: true } });
  }

  public async changeRecord(id: number, author?: string, name?: string, description?: string, price?: number): Promise<void> {
    await this.recordModel.update({
      author: author,
      name: name,
      description: description,
      price: price,
    }, { where: { record_id: id } });
  };

  public async deleteRecord(id: number): Promise<void> {
    await this.recordModel.destroy({ where: { record_id: id } });
  };

  public async sortRecord(value: string): Promise<IRecord[]> {
    if(value === "des") {
      return (await this.recordModel.findAll()).sort((a, b) => b.price - a.price)
    }
    if(value === "asc") {
      return (await this.recordModel.findAll()).sort((a, b) => a.price - b.price)
    }
  }

  public async checkBought(id: number) {
    return this.purchasedModel.findOne({ where: { profile_id: id } });
  }

  public async markAsPurchased(profile_id, record_id): Promise<void> {
    await this.purchasedModel.create({ profile_id, record_id });
  }
}
