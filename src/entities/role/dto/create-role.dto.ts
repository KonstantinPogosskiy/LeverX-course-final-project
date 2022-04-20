import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateRoleDto {

  @IsString({ message: 'Must be a string' })
  @ApiProperty({ example: 'USER', description: 'Role of user' })
  readonly value: string;

  @IsString({ message: 'Must be a string' })
  @ApiProperty({ example: 'user', description: 'Role description' })
  readonly description: string;
}