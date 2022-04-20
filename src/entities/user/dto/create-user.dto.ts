import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {

  @ApiProperty({ example: 'user@mail.ru', description: 'Mail' })
  @IsString({ message: 'Must be a string' })
  @IsEmail({}, { message: 'Incorrect email' })
  readonly email: string;

  @ApiProperty({ example: 'qwe123', description: 'Password' })
  @IsString({ message: 'Must be a string' })
  @Length(4, 16, { message: 'Not less than 4 chars and not biggest 16 chars' })
  readonly password: string;

  @ApiProperty({ example: 'true', description: 'User is authorized or not' })
  readonly isAuth: boolean;
}
