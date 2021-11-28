import { FC } from 'react';
import { Button } from '@/components/Button';
import styles from'./GameStart.module.scss';

export type OnGameStartParams = {
  withComputer: boolean,
};

type OwnProps = {
  onGameStart: ({ withComputer }: OnGameStartParams) => void;
};

export const GameStart: FC<OwnProps> = ({
  onGameStart,
}) => {
  const handleWithComputerClick = () => { onGameStart({ withComputer: true }); };
  const handleWithPersonClick = () => { onGameStart({ withComputer: false }); };

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>
        Начать игру
      </h1>
      <div className={styles.buttons}>
        <Button
          className={styles.button}
          onClick={handleWithComputerClick}
        >
          С комьютером
        </Button>
        <Button
          className={styles.button}
          view="outline"
          onClick={handleWithPersonClick}
        >
          С другим игроком
        </Button>
      </div>
    </div>
  );
};
