import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IUser } from '../../Interfaces/IUser';
import { IUserService } from '../../Interfaces/IUserService';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../../models/user/user.model';
import { RoleService } from '../role/role.service';
import { AddRoleDto } from './dto/add-role.dto';

@Injectable()
export class UserService implements IUserService {

  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private roleService: RoleService,
  ) {
  };

  public async createUser(payload): Promise<IUser> {

    const user = await this.userModel.create({
      isAuth: true,
      ...payload,
    });
    const role = await this.roleService.getRoleByValue('ADMIN');
    await user.$set('roles', [role.id]);
    user.roles = [role];
    return user;
  }

  public async getUserById(id: number): Promise<IUser> {
    return this.userModel.findOne({ where: { user_id: id }, include: { all: true } });
  }

  public async getAllUsers(): Promise<IUser[]> {
    return this.userModel.findAll({ include: { all: true } });
  }

  public async checkPassword(password: string): Promise<IUser> {
    return this.userModel.findOne({ where: { password: password } });
  }

  public async checkEmail(email: string): Promise<IUser> {
    return this.userModel.findOne({ where: { email: email }, include: { all: true } });
  }

  async addRole(dto: AddRoleDto) {
    const user = await this.userModel.findByPk(dto.user_id);
    const role = await this.roleService.getRoleByValue(dto.value);
    if (role && user) {
      await user.$add('role', role.id);
      return dto;
    }
    throw new HttpException('No such user or role found', HttpStatus.NOT_FOUND);
  }
}
