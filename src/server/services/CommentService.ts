import { BaseRESTService } from '@/server/services/BaseRESTService';
import { Comment } from '@/server/models';

interface CreateRequest {
  authorId: number;
  content: string;
  replyTo?: number;
  topicId: number;
}

class CommentService implements BaseRESTService {
  public create = (data: CreateRequest) => {
    return Comment.create(data);
  }
}

export const commentService = new CommentService();