export interface IAuthenticatedDTO {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: string;
}
