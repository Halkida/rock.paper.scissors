import React, { FC, useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import rpsImage from '@/assets/rps.png';
import commentService from '@/services/comment';
import topicService from '@/services/topic';
import { IComment } from '@/types/Forum';
import { useService } from '@/hooks';
import { TopicItem } from '@/components/TopicItem';
import Spinner from '@/components/Spinner';
import { CommentCreate } from './components/CommentCreate';
import { Comment } from './components/Comment';
import styles from'./Topic.module.scss';

interface Comment {
  id: number;
  author: string;
  content: string;
  replyTo?: number;
}

interface Topic {
  id: number;
  authorInfo: {
    avatar: string,
    login: string
  };
  title: string;
  content: string;
  commentsCount?: number;
}

export const Topic: FC = () => {
  const [topic, setTopic] = useState<Topic>();
  const { id: topicId = 0 } = useParams();
  const [ replyTo, setReplyTo ] = useState(null);
  const [isFirstCommentRender, setIsFirstCommentRender]  = useState(true);

  const {
    fetch: fetchComment,
    isFetching: isFetchingComment,
    data: comments,
  } = useService({
    service: commentService.getList,
    initialData: [],
  });

  const handleCommentAnswer = useCallback((value) => {
    setReplyTo(value);
  }, []);

  const handleResetReply = useCallback(() => {
    setReplyTo(null);
  }, []);

  const handleRepliedAuthorClick = useCallback(() => {
    console.log('handleRepliedAuthorClick');
  }, []);

  const handleCommentRepliedClick = useCallback((commentId) => {
    console.log(commentId);
  }, []);

  const handleCommentCreated = useCallback(() => {
    setIsFirstCommentRender(false);
    fetchComment({ topicId });
  }, [fetchComment, topicId]);

  useEffect(() => {
    const fetchData = async () => {
      const topic = await topicService.getTopic(Number(topicId));
      const normilizedTopic = {
        id: topic.id,
        title: topic.title,
        content: topic.content,
        commentsCount: 0,
        authorInfo: {
          avatar: topic.avatar ? topic.avatar : '',
          login: topic.login
        }
      };
      setTopic(normilizedTopic);
    };

    fetchComment({ topicId });

    fetchData();
  }, []);

  return (
    <main className={styles.page}>
      <div className={styles.head}>
        <div className={styles.head_logo}>
          <img
            className={styles.logo}
            src={rpsImage}
          />
        </div>
      </div>
      <div className={styles.topic}>
        { topic &&
          <TopicItem {...topic} />
        }
      </div>
      <div className={styles.comments}>
        <h2
          className={styles.comments_head}
        >
          ??????????????????????
        </h2>
        {(isFetchingComment && isFirstCommentRender) ? (
          <Spinner
            className={styles.comments_spinner}
            type="block"
          />
        ) : (
            <React.Fragment>
              <div className={styles.comments_list}>
                {(comments as IComment[]).map((comment) => (
                  <Comment
                    key={comment.id}
                    id={comment.id}
                    login={comment.login}
                    authorId={comment.author_id}
                    avatar={comment.avatar}
                    replyTo={comment.reply_to}
                    content={comment.content}
                    onAnswer={handleCommentAnswer}
                    onRepliedClick={handleCommentRepliedClick}
                  />
                ))}
              </div>
              <div className={styles.comments_create}>
                <CommentCreate
                  replyTo={replyTo}
                  onResetReply={handleResetReply}
                  onRepliedAuthorClick={handleRepliedAuthorClick}
                  onCommentCreated={handleCommentCreated}
                />
              </div>
            </React.Fragment>
          )}
      </div>
    </main>
  );
};