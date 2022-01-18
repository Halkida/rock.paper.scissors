import { FC, useState, useEffect } from 'react';
import { TopicItem } from '@/components/TopicItem';
import { Button } from '@/components/Button';
import { CreateTopicModal } from './CreateTopicModal';
import { useModal } from '@/components/Modal';
import rpsImage from '@/assets/rps.png';
import styles from'./Forum.module.scss';

interface TopicListItem {
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

  const topic = {
    id: 1,
    authorInfo: {
      avatar: '...',
      login: 'SUPER_LOGIN'
    },
    title: 'Камень ножницы бумага лучшая игра',
    content: 'Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмысленного текста рыбы на русском языке, а начинающему оратору отточить навык публичных выступлений в домашних условиях. При создании генератора мы использовали небезизвестный универсальный код речей. Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмысленного текста рыбы на русском языке, а начинающему оратору отточить навык публичных выступлений в домашних условиях. При создании генератора мы использовали небезизвестный универсальный код речей',
    commentsCount: 300
  };

  useEffect(() => {
    setTopicList([topic, topic]);
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
        <div className={styles.head_button}>
          <Button onClick={toggle} view='outline'>Создать тему</Button>
        </div>
      </div>
      <div className={styles.forum}>
        {topicList.map((topic) => <TopicItem key={topic.id} {...topic} />)}
      </div>
      <CreateTopicModal
        isShown={isShown}
        toggle={toggle}
      />
    </main>
  );
};