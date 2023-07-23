import { Module } from '@nestjs/common';
import { SpotifyAuthService } from 'src/modules/Auth/services/spotify-auth.service';
import { AuthService } from 'src/modules/Auth/services/auth.service';
import { AuthController } from './controllers/auth.controller';

@Module({
  providers: [
    AuthService,
    { provide: 'AUTH_PROVIDER', useClass: SpotifyAuthService },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
