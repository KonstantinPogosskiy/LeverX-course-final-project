import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Record } from './records.model';
import { ApiProperty } from '@nestjs/swagger';
import { Profile } from '../profile/profile.model';

@Table({ tableName: 'purchased', createdAt: false, updatedAt: false })

export class Purchased extends Model<Purchased> {

  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ example: '1', description: 'Unique user identifier' })
  @Column({ type: DataType.INTEGER })
  @ForeignKey(() => Profile)
  profile_id: number;

  @ApiProperty({ example: '1', description: 'Unique record identifier' })
  @Column({ type: DataType.INTEGER })
  @ForeignKey(() => Record)
  record_id: number;
}