import { FC, useState, useEffect } from 'react';
import mockTopicData from './mockTopicData';
import styles from'./Topic.module.scss';

interface Comment {
  id: number;
  author: string;
  content: string;
}

interface Topic {
  id: number
  description: string;
  author: string; // shoud be IUser
  title: string;
  commentsCount: number;
  comments: Comment[];
}

type Nullable<T> = T | null;

export const Topic: FC = () => {
  const [topic, setTopic] = useState<Nullable<Topic>>(null);

  useEffect(() => {
    setTopic(mockTopicData);
  }, []);

  return (
    <main className={styles.page}>
      <div className={styles.topic}>
        { topic &&
          <>
            <h1 className={styles.topic_title}>{topic.title}</h1>
            <div className={styles.topic_author}>{topic.author}</div>
            <div className={styles.topic_description}>{topic.description}</div>

            <ul className={styles.comments_list}>
              { topic.comments.map((comment: Comment) => {
                return (
                  <li key={comment.id} className={styles.item}>
                    <div className={styles.comment_author}>{comment.author}</div>
                    <div className={styles.comment_content}>{comment.content}</div>
                  </li>
                );
              }) }
            </ul>
          </>
        }
      </div>
    </main>
  );
};