import { FC, useCallback } from 'react';
import { AvatarImg } from '@/components/Avatar/AvatarImg';
import { Button } from '@/components/Button';
import { IComment } from '@/types/Forum';
import styles from './Comment.module.scss';

type OwnProps = {
  id: number,
  authorId: number,
  login: string;
  avatar: string | null;
  content: string;
  replyTo?: IComment;
  onAnswer: (params: {
    commentId: number,
    authorId: number,
    authorName: string,
  }) => void;
  onRepliedClick: (commentId: number) => void;
}

type Props = FC<OwnProps>;

export const Comment: Props = ({
  id,
  authorId,
  login,
  avatar,
  content,
  replyTo,
  onAnswer,
  onRepliedClick,
}) => {
  const handleAnswerClick = useCallback(() => {
    onAnswer({
      commentId: id,
      authorId,
      authorName: login,
    });
  }, [onAnswer, id, authorId, login]);

  const handleRepliedClick = useCallback(() => {
    onRepliedClick(id);
  }, [onRepliedClick]);

  return (
    <div className={styles.comment}>
      <div className={styles.author}>
        <AvatarImg
          avatarSrc={avatar}
          className={styles.author_avatar}
          size="xsmall"
        />
        <div
          className={styles.author_name}
        >
          {login}
        </div>
      </div>
      {replyTo && (
        <div
          className={styles.replyTo}
        >
          <div
            className={styles.replyTo_title}
          >
            Ответ на комментарий от
          </div>
          <Button
            view="text"
            className={styles.replyTo_author}
            onClick={handleRepliedClick}
          >
            {login}
          </Button>
        </div>
      )}
      <div className={styles.comment_content}>
        {content}
      </div>
      <div className={styles.actions}>
        <Button
          view="text"
          className={styles.answer}
          onClick={handleAnswerClick}
        >
          Ответить
        </Button>
      </div>
    </div>
  );
};