import { IAuthenticatedDTO } from '../dto/auth-dto';

export interface IAuthProvider {
  authenticate(code: string): Promise<IAuthenticatedDTO>;
  authorize(): string;
}
