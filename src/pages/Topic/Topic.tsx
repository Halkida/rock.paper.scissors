import { FC, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import rpsImage from '@/assets/rps.png';
import commentService from '@/services/comment';
import topicService from '@/services/topic';
import { IComment } from '@/types/Forum';
import { useService } from '@/hooks';
import { TopicItem } from '@/components/TopicItem';
import Spinner from '@/components/Spinner';
import { Comment } from './components/Comment';
import styles from'./Topic.module.scss';

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

  const {
    fetch: fetchComment,
    isFetching: isFetchingComment,
    data: comments,
  } = useService({
    service: commentService.getList,
    initialData: [],
  });

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

    fetchComment({ topicId });

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
        <div className={styles.comments_list}>
          {isFetchingComment ?
            <Spinner /> :
            (comments as IComment[]).map((comment) => (
              <Comment
                key={comment.id}
                author={comment.author}
                content={comment.content}
              />
            ))
          }
        </div>
      </div>
    </main>
  );
};