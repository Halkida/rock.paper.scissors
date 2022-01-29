import { IUser } from './';

export interface IComment {
  id: number;
  content: string;
  author: IUser;
  createAt: string;
  updateAt: string;
  replyTo: IComment;
}

export type CommentCreation = Omit<IComment, 'id' | 'createAt' | 'updateAt'>;
