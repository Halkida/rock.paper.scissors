import { FC } from 'react';
import { Button } from '@/components/Button';
import styles from'./GameStart.module.scss';

const GameStart: FC = function GameStartPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>
        Начать игру
      </h1>
      <div className={styles.buttons}>
        <Button
          className={styles.button}
        >
          С комьютером
        </Button>
        <Button
          className={styles.button}
          disabled
          view="outline"
        >
          С другим игроком
        </Button>
      </div>
    </div>
  );
};

export default GameStart;