import { IFollowers } from 'src/interfaces/followers.interface';
import { IImage } from 'src/interfaces/image.interface';

export interface IUser {
  country: string;
  displayName: string;
  email: string;
  followers: IFollowers;
  href: string;
  id: string;
  images: IImage[];
  product: string;
  type: string;
  uri: string;
}
