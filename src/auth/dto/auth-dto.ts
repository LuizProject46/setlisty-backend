import { IImage } from 'src/interfaces/image.interface';

export interface IAuthenticatedDTO {
  accessToken: string;
  refreshToken?: string;
  expiresIn?: number;
  tokenType?: string;
}

export interface IMeDTO {
  displayName: string;
  email: string;
  id: string;
  images: IImage[];
}
