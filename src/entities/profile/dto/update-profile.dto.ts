import { ApiProperty } from '@nestjs/swagger';

export class UpdateProfileDto {

  @ApiProperty({ example: '1', description: 'Unique profile ID' })
  profile_id: number;

  @ApiProperty({ example: '1', description: 'Unique user ID' })
  user_id: number;

  @ApiProperty({ example: 'Ivan', description: 'User first name' })
  firstName: string;

  @ApiProperty({ example: 'Ivanov', description: 'User last name' })
  lastName: string;

  @ApiProperty({ example: '01.01.2001', description: 'Date of birth' })
  readonly birthDate: string;

  @ApiProperty({ example: 'avatar', description: 'User avatar' })
  avatar: string;
}