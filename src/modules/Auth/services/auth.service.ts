import { Injectable } from '@nestjs/common';
import { IAuthProvider } from 'src/modules/Auth/interfaces/auth-provider';

@Injectable()
export class AuthService {
  constructor(private readonly authProvider: IAuthProvider) {}

  public async authenticate(code: string): Promise<string> {
    const access_token = await this.authProvider.authenticate(code);

    return access_token;
  }

  public authorize(): string {
    return this.authProvider.authorize();
  }
}
