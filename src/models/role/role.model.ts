import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import { User } from '../user/user.model';
import { UserRoles } from './user-roles.model';
import { ApiProperty } from '@nestjs/swagger';

interface RoleCreationAttrs {
  value: string;
  description: string;
}

@Table({ tableName: 'roles', createdAt: false, updatedAt: false })
export class Role extends Model<Role, RoleCreationAttrs> {

  @ApiProperty({ example: '1', description: 'Unique identifier' })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ example: 'USER', description: 'Role of user' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  value: string;

  @ApiProperty({ example: 'user', description: 'Role description' })
  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @BelongsToMany(() => User, () => UserRoles)
  users: User[];
}