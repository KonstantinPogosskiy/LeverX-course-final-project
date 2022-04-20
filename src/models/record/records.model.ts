import { Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Reaction } from '../reaction/reaction.model';

@Table({ tableName: 'records' })

export class Record extends Model<Record> {
  @ForeignKey(() => Record)
  @ApiProperty({ example: '1', description: 'Unique record identifier' })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  record_id: number;

  @ApiProperty({ example: 'Black Sabbath', description: 'Record author' })
  @Column({ type: DataType.STRING, allowNull: false })
  author: string;

  @ApiProperty({ example: 'name', description: 'Record name' })
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @ApiProperty({ example: 'description', description: 'Record description' })
  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @ApiProperty({ example: '30', description: 'Record price' })
  @Column({ type: DataType.INTEGER })
  price: number;

  @ApiProperty({ example: 'picture', description: 'Record picture' })
  @Column({ type: DataType.STRING, allowNull: false })
  picture: string;

  @HasMany(() => Reaction)
  userReactions: Reaction[];

}
