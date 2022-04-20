import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Record } from '../record/records.model';

@Table({ tableName: 'reactions' })

export class Reaction extends Model {

  @ApiProperty({ example: '1', description: 'Unique reaction identifier' })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  reaction_id: number;

  @ApiProperty({ example: '1', description: 'Unique user identifier' })
  @Column({ type: DataType.INTEGER })
  user_id: number;

  @ForeignKey(() => Record)
  @ApiProperty({ example: '1', description: 'Unique record identifier' })
  @Column({ type: DataType.INTEGER })
  record_id: number;

  @ApiProperty({ example: 'Nice record!!!', description: 'Record comment' })
  @Column({ type: DataType.STRING })
  comment: string;

  @ApiProperty({ example: '5', description: 'Record score' })
  @Column({ type: DataType.INTEGER })
  score: number;

  @BelongsTo(() => Record)
  record: Record;
}
