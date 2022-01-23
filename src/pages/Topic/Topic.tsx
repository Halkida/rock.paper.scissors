import { FC, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { TopicItem } from '@/components/TopicItem';
import rpsImage from '@/assets/rps.png';
import { Comment } from './components/Comment';
import topicService from '@/services/topic';
import styles from'./Topic.module.scss';

const comment = {
  author: {
    id: 0,
    email: 'test@mail.ru',
    first_name: 'Вася',
    second_name: 'Пупкин',
    phone: '',
    login: '',
    display_name: 'vasya',
  },
  content: 'rgnaekjgnakw n akjgnwekngewkvk nkarn karnknekawnv aekj gviekn kv awiekdnv kszjvn awi k ika wekdnb akew dk',
};

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
          Комментарии
        </h2>
        <Comment
          author={comment.author}
          content={comment.content}
        />
      </div>
    </main>
  );
};