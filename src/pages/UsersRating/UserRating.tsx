import { FC } from 'react';
import UserItem from './components/UserItem';
import styles from './UserRating.module.scss';

const data: [] = [];

const UserRating: FC = function UserRating() {
  return (
    <div>
      <h1>
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