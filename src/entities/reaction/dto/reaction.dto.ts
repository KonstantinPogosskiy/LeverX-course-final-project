import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class ReactionDto {

  @IsNumber({}, { message: 'Must be a number' })
  @ApiProperty({ example: '1', description: 'Unique reaction ID' })
  record_id: number;

  @IsNumber({}, { message: 'Must be a number' })
  @ApiProperty({ example: '1', description: 'Unique user ID' })
  user_id: number;

  @IsString({ message: 'Must be a string' })
  @ApiProperty({ example: 'Nice record!!!', description: 'Record comment' })
  comment: string;

  @IsNumber({}, { message: 'Must be a number' })
  @ApiProperty({ example: '5', description: 'Record score' })
  score: number;
}