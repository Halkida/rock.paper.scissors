export interface IComment {
  id: number;
  content: string;
  author_id: number;
  login: string;
  avatar: string | null;
  createAt: string;
  updateAt: string;
  reply_to: IComment;
}

export type CommentCreation = {
  content: string;
  authorId: number;
  replyTo?: number;
  topicId: number;
};
