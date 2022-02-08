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
      SELECT c.ID, c.AUTHOR_ID, c.CONTENT, c.REPLY_TO, u.AVATAR, u.LOGIN
             , c2.AUTHOR_ID AS REPLY_AUTHOR_ID, c2.CONTENT AS REPLY_CONTENT
             , c2.REPLY_TO AS REPLY_REPLY_TO, u2.AVATAR AS REPLY_AVATAR
             , c2.ID AS REPLY_ID, u2.LOGIN AS REPLY_LOGIN
      FROM RPS_COMMENT c
            LEFT JOIN RPS_COMMENT c2 ON c2.ID = c.REPLY_TO
            LEFT JOIN RPS_USER u ON u.ID = c.AUTHOR_ID
            LEFT JOIN RPS_USER u2 ON u2.ID = c2.AUTHOR_ID
      WHERE c.TOPIC_ID = ?
      ORDER BY c.created_at
    `, { replacements: [topicId] });
  };
}

export const commentService = new CommentService();