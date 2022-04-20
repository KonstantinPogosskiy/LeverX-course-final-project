import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddRoleDto {

  @IsString({ message: 'Must be a string' })
  @ApiProperty({ example: 'USER', description: 'Role of user' })
  readonly value: string;

  @IsNumber({}, { message: 'Must be a number' })
  @ApiProperty({ example: '1', description: 'Unique user ID' })
  readonly user_id: number;
}