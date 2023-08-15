import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { SpotifyAuthService } from './services/spotify-auth.service';

@Module({
  providers: [SpotifyAuthService],
  controllers: [AuthController],
  exports: [SpotifyAuthService],
})
export class AuthModule {}
