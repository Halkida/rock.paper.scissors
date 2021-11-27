import { FC } from 'react';
import styles from'./Finish.module.scss';

export const GameFinish: FC = () => {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>
        Игра окончена
      </h1>
    </div>
  );
};
