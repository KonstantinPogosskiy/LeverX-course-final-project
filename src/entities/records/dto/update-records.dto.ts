import { ApiProperty } from '@nestjs/swagger';

export class UpdateRecordsDto {

  @ApiProperty({ example: 'Black Sabbath', description: 'Record author' })
  author: string;

  @ApiProperty({ example: 'I coming home', description: 'Record name' })
  name: string;

  @ApiProperty({ example: 'description', description: 'Record description' })
  description: string;

  @ApiProperty({ example: '3000', description: 'Record price' })
  price: number;
}