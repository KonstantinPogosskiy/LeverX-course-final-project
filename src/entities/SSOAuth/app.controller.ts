import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthorizationService } from '../authorization/authorization.service';

@ApiTags('Google Auth')
@Controller('google')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authorizationService: AuthorizationService,
  ) {
  }

  @ApiOperation({ summary: 'Google authorization' })
  @ApiResponse({ status: 200 })
  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {
  }

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req) {
    await this.authorizationService.signUp({
        email: req.user.email,
        password: req.user.accessToken,
        isAuth: false,
      }
    )
    return this.appService.googleLogin(req);
  }
}