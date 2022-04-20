import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../user/user.model';
import { Purchased } from '../record/bought-records.model';
import { Record } from '../record/records.model';

@Table({ tableName: 'profiles' })

export class Profile extends Model {

  @ApiProperty({ example: '1', description: 'Unique profile identifier' })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  @ForeignKey(() => Profile)
  profile_id: number;

  @ApiProperty({ example: '1', description: 'Unique user identifier' })
  @Column({ type: DataType.INTEGER })
  @ForeignKey(() => User)
  user_id: number;

  @ApiProperty({ example: 'Ivan', description: 'User first name' })
  @Column({ type: DataType.STRING, allowNull: false })
  firstName: string;

  @ApiProperty({ example: 'Ivanov', description: 'User last name' })
  @Column({ type: DataType.STRING, allowNull: false })
  lastName: string;

  @ApiProperty({ example: '01.01.2001', description: 'Date of birth' })
  @Column({ type: DataType.STRING })
  birthDate: string;

  @ApiProperty({ example: 'avatar', description: 'User avatar' })
  @Column({ type: DataType.STRING })
  avatar: string;

  @BelongsTo(() => User)
  user: User;

  @BelongsToMany(() => Record, () => Purchased)
  records: Record[];

}
