import { FC } from 'react';
import { Link } from 'react-router-dom';
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
  commentsCount: number;
}

export const TopicItem: FC<topicProps> = ({
  id, authorInfo, title, content, commentsCount
}) => {
  const linkPath = `/forum/${id}`;

  return (
    <div className={styles.topic}>
      <div className={styles.topic_head}>
        <div className={styles.avatar}>{authorInfo.avatar}</div>
        <div className={styles.login}>{authorInfo.login}</div>
      </div>
      <div className={styles.topic_body}>
        <Link className={styles.topic_title} to={linkPath}>{title}</Link>
        <span className={styles.topic_content}>{content}</span>
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