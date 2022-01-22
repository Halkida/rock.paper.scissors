import { FC } from 'react';
import { AvatarImg } from '@/components/Avatar/AvatarImg';
import { IUser } from '@/types';
import styles from './Comment.module.scss';

type OwnProps = {
  author: IUser;
  content: string;
}

type Props = FC<OwnProps>;

export const Comment: Props = ({ author, content }) => {
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
      <div className={styles.comment_content}>
        {content}
      </div>
    </div>
  );
};