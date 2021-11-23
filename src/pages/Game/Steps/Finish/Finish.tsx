import { FC } from 'react';
// import { Button } from '@/components/Button';
import styles from'./Finish.module.scss';

export type OnGameStartParams = {
  withComputer: boolean,
};

type OwnProps = {
  // onGameStart: ({ withComputer }: OnGameStartParams) => void;
};

const GameStart: FC<OwnProps> = function GameStartPage({
  // onGameStart,
}) {
  // const handleWithComputerClick = () => { onGameStart({ withComputer: true }) };
  // const handleWithPersonClick = () => { onGameStart({ withComputer: false }) };

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>
        Игра окончена
      </h1>
    </div>
  );
};

export default GameStart;