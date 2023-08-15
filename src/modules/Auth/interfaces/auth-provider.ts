import { IAuthenticatedDTO } from './auth-dto';

export interface IAuthProvider {
  authenticate(code: string): Promise<IAuthenticatedDTO>;
  authorize(): string;
}
