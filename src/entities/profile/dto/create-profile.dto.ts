import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateProfileDto {

  @ApiProperty({ example: '1', description: 'Unique profile ID' })
  profile_id: number;

  @IsNumber({}, { message: 'Must be a number' })
  @ApiProperty({ example: '1', description: 'Unique user ID' })
  user_id: number;

  @IsString({ message: 'Must be a string' })
  @ApiProperty({ example: 'Ivan', description: 'User first name' })
  firstName: string;

  @IsString({ message: 'Must be a string' })
  @ApiProperty({ example: 'Ivanov', description: 'User last name' })
  lastName: string;

  @IsString({ message: 'Must be a string' })
  @ApiProperty({ example: '01.01.2001', description: 'Date of birth' })
  readonly birthDate: string;

  @IsString({ message: 'Must be a string' })
  @ApiProperty({ example: 'avatar', description: 'User avatar' })
  avatar: string;
}