export interface IAuthProvider {
  authenticate(code: string): Promise<string>;
  authorize(): string;
}
