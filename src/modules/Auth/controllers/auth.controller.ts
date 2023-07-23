import { Controller, Get, Query, Redirect, Res } from '@nestjs/common';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @Redirect()
  async authenticate(@Query('code') code: string) {
    const accessToken = await this.authService.authenticate(code);

    return { url: '/home', access_token: accessToken };
  }

  @Get('spotify')
  async authorize() {
    const url = await this.authService.authorize();

    return url;
  }
}
