import { BaseRESTService } from '@/server/services/BaseRESTService';
import { Comment } from '@/server/models';
import { sequelize } from '../initSequilize';

interface CreateRequest {
  authorId: number;
  content: string;
  replyTo?: number;
  topicId: number;
}

class CommentService implements BaseRESTService {
  public create = (data: CreateRequest) => {
    return Comment.create(data);
  };

  public request = (topicId: number) => {
    return sequelize.query(`
      SELECT c.ID, c.AUTHOR_ID, c.CONTENT, c.REPLY_TO, c.TAGS, u.LOGIN, u.AVATAR, u.LOGIN
      FROM RPS_COMMENT c
            LEFT JOIN RPS_USER u ON u.ID = c.AUTHOR_ID
      WHERE c.TOPIC_ID = ?
      ORDER BY c.created_at
    `, { replacements: [topicId] });
  };
}

export const commentService = new CommentService();