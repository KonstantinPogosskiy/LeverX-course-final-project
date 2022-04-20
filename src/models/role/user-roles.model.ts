import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Role } from './role.model';
import { User } from '../user/user.model';


@Table({ tableName: 'user-roles' })
export class UserRoles extends Model<UserRoles> {

  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => Role)
  @Column({ type: DataType.INTEGER })
  role_id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  user_id: number;
}