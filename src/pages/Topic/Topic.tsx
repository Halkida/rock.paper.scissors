import { FC, useState, useEffect } from 'react';
import { Image } from '@/components/Image';
import { Comment } from './components/Comment';
import { IUser } from '@/types';
import mockTopicData from './mockTopicData';
import styles from'./Topic.module.scss';

interface Comment {
  id: number;
  author: IUser;
  content: string;
}

interface Topic {
  id: number
  description: string;
  author: IUser;
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
            <div className={styles.topic_author}>
              <span>{topic.author.display_name}</span>
              {/* TODO need to fix empty avatar */}
              { topic.author.avatar ?
                <>
                  <Image src={topic.author.avatar} width='80px' height='80px' alt='Аватар' />
                </>
                : null
              }
            </div>
            <div className={styles.topic_description}>{topic.description}</div>
            <div className={styles.comments}>
              <ul>
                { topic.comments.map((comment: Comment) => {
                  return (
                    <li key={comment.id}>
                      <Comment author={comment.author} content={comment.content} />
                    </li>
                  );
                }) }
              </ul>
            </div>

          </>
        }
      </div>
    </main>
  );
};