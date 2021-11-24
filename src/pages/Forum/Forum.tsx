import { FC, useState, useEffect  } from 'react';
import { Link } from 'react-router-dom';
import { IUser } from '@/types/User';
import moсkTopicList from './mockTopicListData';
import styles from'./Forum.module.scss';

interface TopicListItem {
  id: number;
  author: IUser;
  title: string;
  commentsCount: number
}
type TopicList = TopicListItem[];

export const Forum: FC = () => {
  const [topicList, setTopicList] = useState<TopicList>([]);

  useEffect(() => {
    setTopicList(moсkTopicList);
  }, []);

  return (
    <main className={styles.page}>
      <h1>Форум</h1>
      <div className={styles.forum}>
        <table className={styles.forum_table}>
          <thead>
            <tr>
              <th>Автор</th>
              <th>Название</th>
              <th>Комментов</th>
            </tr>
          </thead>
          <tbody>
            { topicList.map((topic: TopicListItem) => {
              return (
                <tr key={topic.id}>
                  <td>{topic.author.nickName}</td>
                  <td><Link className='link' to="/forum/1" >{topic.title}</Link></td>
                  <td>{topic.commentsCount}</td>
                </tr>
              );
            }) }
          </tbody>
        </table>
      </div>
    </main>
  );
};