import { Injectable } from '@nestjs/common';
import { IAuthProvider } from 'src/auth/interfaces/auth-provider';
import SpotifyWebApi from 'spotify-web-api-node';
import { randomBytes as random } from 'crypto';
import { IAuthenticatedDTO } from '../dto/auth-dto';

Injectable();
export class SpotifyAuthService implements IAuthProvider {
  private spotifyApi: SpotifyWebApi;
  private scopes: string[];

  public constructor() {
    this.spotifyApi = new SpotifyWebApi({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      redirectUri: `${process.env.APP_URL}/auth/callback`,
    });

    this.scopes = [
      'user-read-email',
      'user-read-private',
      'playlist-read-private',
      'user-read-playback-state',
      'user-library-read',
    ];
  }

  public async authenticate(code: string): Promise<IAuthenticatedDTO> {
    const authoriazationCodeGrant =
      await this.spotifyApi.authorizationCodeGrant(code);

    const { access_token, refresh_token, expires_in, token_type } =
      authoriazationCodeGrant.body;

    this.spotifyApi.setAccessToken(access_token);
    this.spotifyApi.setRefreshToken(refresh_token);

    return {
      accessToken: access_token,
      expiresIn: expires_in,
      refreshToken: refresh_token,
      tokenType: token_type,
    };
  }

  public authorize(): string {
    const state = random(16).toString('hex');

    return this.spotifyApi.createAuthorizeURL(this.scopes, state, true);
  }
}
