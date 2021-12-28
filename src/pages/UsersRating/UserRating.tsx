import { FC, useEffect, useState } from 'react';
import UserItem from './components/UserItem';
import styles from './UserRating.module.scss';
import leaderboardService from "@/services/leaderboard";

type PlayerData = {
  index?: number;
  login: string;
  score: number;
};

type responseData = {
  data: PlayerData
}

const UserRating: FC = function UserRating() {
  const [data, setData] = useState([]);

  useEffect(() => {
    leaderboardService.getLeaderboard()
      .then((response) => {
        const players = response.map((item: responseData, index: number) => {
          return {...item.data, index}
        });
        setData(players);
      });
  }, []);

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>
        Рейтинг игроков
      </h1>
      <div className={styles.container}>
        <div className={styles.list}>
          {data.length > 0 && data.map(({
            index,
            login,
            score,
          }) => (
            <UserItem
              key={`${index}_${login}`}
              index={index}
              name={login}
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