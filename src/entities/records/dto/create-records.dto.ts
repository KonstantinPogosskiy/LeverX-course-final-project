import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateRecordsDto {

  @IsString({ message: 'Must be a string' })
  @ApiProperty({ example: 'Black Sabbath', description: 'Record author' })
  author: string;

  @IsString({ message: 'Must be a string' })
  @ApiProperty({ example: 'name', description: 'Record name' })
  name: string;

  @IsString({ message: 'Must be a string' })
  @ApiProperty({ example: 'description', description: 'Record description' })
  description: string;

  @IsNumber({}, { message: 'Must be a number' })
  @ApiProperty({ example: '3000', description: 'Record price' })
  price: number;

  @IsString({ message: 'Must be a string' })
  @ApiProperty({ example: 'picture', description: 'Record picture' })
  picture: string;
}