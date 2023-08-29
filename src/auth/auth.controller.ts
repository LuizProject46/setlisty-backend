import {
  Controller,
  Get,
  HttpCode,
  Query,
  Redirect,
  Req,
} from '@nestjs/common';
import { SpotifyAuthService } from './services/spotify-auth.service';
import { IAuthenticatedDTO, IMeDTO } from './dto/auth-dto';

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

  @Get('me')
  @HttpCode(200)
  async me(@Req() request: Request): Promise<IMeDTO> {
    const { accessToken } = request.body as unknown as IAuthenticatedDTO;

    const me = await this.authService.me(accessToken);

    return me;
  }
}
