import { FC, useState, useEffect } from 'react';
import { TopicItem } from '@/components/TopicItem';
import { Button } from '@/components/Button';
import { CreateTopicModal } from './CreateTopicModal';
import { useModal } from '@/components/Modal';
import topicService from '@/services/topic';
import rpsImage from '@/assets/rps.png';
import styles from'./Forum.module.scss';

export interface TopicListItem {
  id: number;
  authorInfo: {
    avatar: string,
    login: string
  };
  title: string;
  content: string;
  commentsCount: number;
}
type TopicList = TopicListItem[];

export const Forum: FC = () => {
  const [topicList, setTopicList] = useState<TopicList>([]);
  const { isShown, toggle } = useModal();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await topicService.getAllTopics();
        const topics = data.map((item: Record<string, unknown>) => {
          return {
            id: item.id,
            title: item.title,
            content: item.content,
            commentsCount: item.comments_count,
            authorInfo: {
              avatar: item.avatar ? item.avatar : '',
              login: item.login
            }
          };
        });

        setTopicList(topics);
      } catch(e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  const addNewTopic = (topic: TopicListItem) => {
    setTopicList([...topicList, topic]);
  };


  return (
    <main className={styles.page}>
      <div className={styles.head}>
        <div className={styles.head_logo}>
          <img
            className={styles.logo}
            src={rpsImage}
          />
        </div>
        <div className={styles.head_button}>
          <Button onClick={toggle} view='outline'>Создать тему</Button>
        </div>
      </div>
      <div className={styles.forum}>
        {topicList.map((topic) => (
          <TopicItem
            key={topic.id}
            {...topic}
            isPreview={true}
          />
        ))}
      </div>
      <CreateTopicModal
        isShown={isShown}
        toggle={toggle}
        addNewTopic={addNewTopic}
      />
    </main>
  );
};