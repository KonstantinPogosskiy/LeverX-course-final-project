import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { ProfileService } from '../profile/profile.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/create-user.dto';

const bcrypt = require('bcrypt');

@Injectable()
export class AuthorizationService {

  constructor(
    private jwtService: JwtService,
    private profileService: ProfileService,
    private userService: UserService,
  ) {
  };

  async signIn(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  };

  async signUp(userDto: CreateUserDto) {

    const candidate = await this.userService.checkEmail(userDto.email);
    if (candidate) {
      throw new HttpException(`A USER WITH USERNAME ${candidate.email} ALREADY EXISTS`, HttpStatus.BAD_REQUEST);
    }
    const hashPassword = await bcrypt.hash(userDto.password, 10);
    const user = await this.userService.createUser({ ...userDto, password: hashPassword });
    return await this.generateToken(user);
  };

  private async generateToken(user) {
    const payload = { email: user.email, user_id: user.user_id, roles: user.roles };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.checkEmail(userDto.email);
    const passwordEquals = await bcrypt.compare(userDto.password, user.password);

    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({ message: 'INCORRECT LOGIN OR PASSWORD' });
  }
}
