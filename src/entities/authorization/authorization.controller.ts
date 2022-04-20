import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthorizationService } from './authorization.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../user/dto/create-user.dto';

@ApiTags('Authorization')
@Controller('auth')
export class AuthorizationController {

  constructor(private  authService: AuthorizationService) {
  }

  @UsePipes(ValidationPipe)
  @Post('/login')
  signIn(@Body() userDto: CreateUserDto) {
    return this.authService.signIn(userDto);
  }

  @UsePipes(ValidationPipe)
  @Post('/reg')
  signUp(@Body() userDto: CreateUserDto) {
    return this.authService.signUp(userDto);
  }
}


