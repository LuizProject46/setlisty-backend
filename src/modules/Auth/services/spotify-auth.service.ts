import { Injectable } from '@nestjs/common';
import { IAuthProvider } from 'src/modules/Auth/interfaces/auth-provider';
import SpotifyWebApi from 'spotify-web-api-node';
import { randomBytes as random } from 'crypto';

@Injectable()
export class SpotifyAuthService implements IAuthProvider {
  private spotifyApi: SpotifyWebApi;
  private scopes: string[];

  public constructor() {
    this.spotifyApi = new SpotifyWebApi({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      redirectUri: process.env.SPOTIFY_REDIRECT_URI,
    });

    this.scopes = [
      'user-read-email',
      'Ïuser-read-private',
      'playlist-read-private',
      'user-read-playback-state',
      'user-library-read',
    ];
  }

  public async authenticate(code: string): Promise<string> {
    const authenticated = await this.spotifyApi.authorizationCodeGrant(code);

    const { access_token, refresh_token } = authenticated.body;

    this.spotifyApi.setAccessToken(access_token);
    this.spotifyApi.setRefreshToken(refresh_token);

    return access_token;
  }

  public authorize(): string {
    const state = random(16).toString('hex');

    return this.spotifyApi.createAuthorizeURL(this.scopes, state, true);
  }
}
