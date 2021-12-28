import { FC } from 'react';
import { Image } from '@/components/Image';
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
      <div className={styles.comment_author}>
        <span>{display_name}</span>
        { avatar && <Image src={avatar} width='60px' height='60px' alt='Аватар' /> }
      </div>
      <div className={styles.comment_content}>{content}</div>
    </div>
  );
};