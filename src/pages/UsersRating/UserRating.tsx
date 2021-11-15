import { FC } from 'react';
import UserItem from './components/UserItem';
import styles from './UserRating.module.scss';

type User = {
  id: number;
  index: number;
  name: string;
  starsCount: number;
};

const data: User[] = [
  {
    id: 1,
    index: 1,
    name: 'Ваня Иванов',
    starsCount: 100,
  },
  {
    id: 2,
    index: 2,
    name: 'Ваня Пупкин',
    starsCount: 70,
  },
  {
    id: 3,
    index: 3,
    name: 'Ваня Пупкин',
    starsCount: 50,
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
            name,
            starsCount,
          }) => (
            <UserItem
              index={index}
              name={name}
              starsCount={starsCount}
              className={styles.userItem}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserRating;