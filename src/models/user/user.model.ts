import { BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import { Role } from '../role/role.model';
import { UserRoles } from '../role/user-roles.model';
import { ApiProperty } from '@nestjs/swagger';
import { Profile } from '../profile/profile.model';

@Table({ tableName: 'users' })

export class User extends Model<User> {
  @ForeignKey(() => User)
  @ApiProperty({ example: '1', description: 'Unique identifier' })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  user_id: number;

  @ApiProperty({ example: 'user@mail.ru', description: 'Mailing address' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @ApiProperty({ example: 'qwe123', description: 'Password' })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiProperty({ example: 'true', description: 'User is authorized or not' })
  @Column({ type: DataType.BOOLEAN })
  isAuth: boolean;

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];

  @HasMany(() => Profile)
  userProfile: Profile[];
}