import { Body, Controller, Get, Param, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Profile } from '../../models/profile/profile.model';
import { JwtAuthGuard } from '../authorization/jwt.auth.guard';

@ApiTags('Profiles')
@Controller('profiles')
export class ProfileController {

  constructor(private readonly profileService: ProfileService) {
  }

  @ApiOperation({ summary: 'Creating profile' })
  @ApiResponse({ status: 200, type: Profile })
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Post()
  createProfile(@Body() createProfileDto: CreateProfileDto) {
    return this.profileService.createProfile(createProfileDto);
  }

  @ApiOperation({ summary: 'Getting profile by ID' })
  @ApiResponse({ status: 200, type: Profile })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getProfileById(@Param() params) {
    return this.profileService.getProfileById(+params.id);
  }

  @ApiOperation({ summary: 'Update profile' })
  @ApiResponse({ status: 200, type: Profile })
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Patch(':id')
  updateProfile(@Param() params, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.updateProfile(+params.id, updateProfileDto.user_id, updateProfileDto.firstName, updateProfileDto.lastName);
  }
}
