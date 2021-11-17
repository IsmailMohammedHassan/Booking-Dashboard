import { Reply } from './reply';

export interface Comment {
  userId?: string;
  title?: string;
  body?: string;
  location?: string;
  commentImg?: string;
  likes?: number;
  reply?: Reply[];
}
