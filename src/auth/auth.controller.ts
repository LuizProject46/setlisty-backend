import { Controller, Get, HttpCode, Query, Redirect } from '@nestjs/common';
import { SpotifyAuthService } from './services/spotify-auth.service';
import { IAuthenticatedDTO } from './dto/auth-dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: SpotifyAuthService) {}

  @Get('callback')
  @HttpCode(200)
  async authenticate(@Query('code') code: string): Promise<IAuthenticatedDTO> {
    const authenticated = await this.authService.authenticate(code);

    return authenticated;
  }

  @Get('spotify')
  @Redirect()
  @HttpCode(200)
  async authorize() {
    const url = await this.authService.authorize();

    return {
      url,
    };
  }
}
