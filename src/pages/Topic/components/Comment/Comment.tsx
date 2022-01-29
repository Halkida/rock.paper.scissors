import { FC } from 'react';
import { AvatarImg } from '@/components/Avatar/AvatarImg';
import { Button } from '@/components/Button';
import { IUser } from '@/types';
import { IComment } from '@/types/Forum';
import styles from './Comment.module.scss';

type OwnProps = {
  author: IUser;
  content: string;
  replyTo?: IComment;
}

type Props = FC<OwnProps>;

export const Comment: Props = ({
  author,
  content,
  replyTo,
}) => {
  const { display_name, avatar } = author;

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
        >
          Ответить
        </Button>
      </div>
    </div>
  );
};