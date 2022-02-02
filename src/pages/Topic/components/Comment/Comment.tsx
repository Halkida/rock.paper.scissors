import { FC, useCallback } from 'react';
import { AvatarImg } from '@/components/Avatar/AvatarImg';
import { Button } from '@/components/Button';
import { IUser } from '@/types';
import { IComment } from '@/types/Forum';
import styles from './Comment.module.scss';

type OwnProps = {
  id: number,
  author: IUser;
  content: string;
  replyTo?: IComment;
  onAnswer: (params: {
    commentId: number,
    authorId: number,
    authorName: string,
  }) => void;
  onAuthorClick: (commentId: number) => void;
}

type Props = FC<OwnProps>;

export const Comment: Props = ({
  id,
  author,
  content,
  replyTo,
  onAnswer,
  onAuthorClick,
}) => {
  const { display_name, avatar } = author;

  const handleAnswerClick = useCallback(() => {
    onAnswer({
      commentId: id,
      authorId: author.id,
      authorName: display_name || author.first_name,
    });
  }, [onAnswer, id, author]);

  const handleAuthorClick = useCallback(() => {
    onAuthorClick(id);
  }, [onAuthorClick]);

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
          {display_name}
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
            onClick={handleAuthorClick}
          >
            {display_name}
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