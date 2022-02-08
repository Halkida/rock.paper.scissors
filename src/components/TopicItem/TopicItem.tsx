import { FC } from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import { Image } from '@/components/Image';
import Share from '@/icons/Share';
import styles from './TopicItem.module.scss';

type topicProps = {
  id: number;
  authorInfo: {
    avatar: string,
    login: string
  };
  title: string;
  content: string;
  commentsCount?: number;
  isPreview?: boolean;
}

export const TopicItem: FC<topicProps> = ({
  id,
  authorInfo,
  title,
  content,
  commentsCount,
  isPreview = false
}) => {
  const linkPath = `/forum/${id}`;

  return (
    <div className={styles.topic}>
      <div className={styles.topic_head}>
        <Image src={authorInfo.avatar} className={styles.avatar} isRound={true} />
        <div className={styles.login}>{authorInfo.login}</div>
      </div>
      <div className={styles.topic_body}>
        { isPreview
          ? <Link className={cx([
            styles.topic_title,
            styles.topic_title__link
          ])} to={linkPath}>{title}</Link>
          : <span className={styles.topic_title}>{title}</span> }
        <span className={cx([
          styles.topic_content,
          { [styles.topic_content__short]: isPreview }
        ])}>{content}</span>
      </div>
      <div className={styles.topic_footer}>
        <div className={styles.comments}>
          <div className={styles.comments_icon}><Share /></div>
          <div className={styles.comments_count}>{commentsCount}</div>
        </div>
      </div>
    </div>
  );
};