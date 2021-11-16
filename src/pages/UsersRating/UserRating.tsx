import { FC } from 'react';
import UserItem from './components/UserItem';
import styles from './UserRating.module.scss';

type User = {
  id: number;
  index: number;
  name: string;
  score: number;
};

const data: User[] = [
  {
    id: 1,
    index: 1,
    name: 'Ваня Иванов',
    score: 100,
  },
  {
    id: 2,
    index: 2,
    name: 'Ваня Пупкин',
    score: 70,
  },
  {
    id: 3,
    index: 3,
    name: 'Ваня Пупкин',
    score: 50,
  },
  {
    id: 4,
    index: 4,
    name: 'Ваня Пупкин',
    score: 50,
  },
  {
    id: 5,
    index: 5,
    name: 'Ваня Иванов',
    score: 100,
  },
  {
    id: 6,
    index: 7,
    name: 'Ваня Пупкин',
    score: 70,
  },
  {
    id: 8,
    index: 8,
    name: 'Ваня Пупкин',
    score: 50,
  },
  {
    id: 9,
    index: 9,
    name: 'Ваня Пупкин',
    score: 50,
  },
  {
    id: 10,
    index: 10,
    name: 'Ваня Иванов',
    score: 100,
  },
  {
    id: 11,
    index: 11,
    name: 'Ваня Пупкин',
    score: 70,
  },
  {
    id: 12,
    index: 12,
    name: 'Ваня Пупкин',
    score: 50,
  },
  {
    id: 13,
    index: 13,
    name: 'Ваня Пупкин',
    score: 50,
  },
];

const UserRating: FC = function UserRating() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>
        Рейтинг игроков
      </h1>
      <div className={styles.container}>
        <div className={styles.list}>
          {data.map(({
            index,
            id,
            name,
            score,
          }) => (
            <UserItem
              key={id}
              index={index}
              name={name}
              score={score}
              className={styles.userItem}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserRating;