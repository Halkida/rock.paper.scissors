import { FC } from 'react';
import { GameStats } from '@/RPS';
import styles from'./Finish.module.scss';

type OwnProps = {
  gameStats: Nullable<GameStats>;
}

export const GameFinish: FC<OwnProps> = (gameStats) => {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>
        Игра окончена
      </h1>
      <div>
        { gameStats && JSON.stringify(gameStats) }
      </div>
    </div>
  );
};
