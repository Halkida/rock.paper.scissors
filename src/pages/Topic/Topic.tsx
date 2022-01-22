import { FC, useState, useEffect } from 'react';
import { TopicItem } from '@/components/TopicItem';
import rpsImage from '@/assets/rps.png';
import { Comment } from './components/Comment';
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
  comments: Comment[];
}

type Nullable<T> = T | null;

export const Topic: FC = () => {
  const [topic, setTopic] = useState<Nullable<Topic>>(null);

  useEffect(() => {
    setTopic({
      id: 1,
      authorInfo: {
        avatar: '...',
        login: 'SUPER_LOGIN'
      },
      title: 'Камень ножницы бумага лучшая игра',
      content: 'Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмысленного текста рыбы на русском языке, а начинающему оратору отточить навык публичных выступлений в домашних условиях. При создании генератора мы использовали небезизвестный универсальный код речей. Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмысленного текста рыбы на русском языке, а начинающему оратору отточить навык публичных выступлений в домашних условиях. При создании генератора мы использовали небезизвестный универсальный код речей',
      commentsCount: 300,
      comments: []
    });
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