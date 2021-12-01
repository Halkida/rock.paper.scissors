import { FC, useEffect, useState, useCallback } from 'react';
import RPS from '@/RPS';
import Gamer from '@/RPS/Gamer';
import { Cards } from '@/RPS/constants';
import GamerWithCards from './components/GamerWithCards';
import styles from './Play.module.scss';
import * as mocks from './mocks';

type OwnProps = {
  withComputer?: boolean;
  onFinish: () => void;
};

export const GamePlay: FC<OwnProps> = ({
  withComputer = true,
  onFinish,
}) => {
  const [gamers, setGamers] = useState<Gamer[]>([
    new Gamer({
      id: 1,
      type: withComputer ? 'computer' : 'person',
      info: mocks.firstGamer,
    }),
    new Gamer({
      id: 2,
      info: mocks.secondGamer,
    }),
  ]);
  const [game, setGame] = useState<RPS>();
  useEffect(() => {
    setGame(new RPS({
      gamers,
      onInit() {
        console.log('init');
      },
      onGameStarted(gamers) {
        setGamers([...gamers]);
      },
      onGamerMadeAStep(gamers) {
        setGamers([...gamers]);
      },
      onGameFinished() {
        onFinish();
      },
    }));
  }, []);

  const handleCardClick = useCallback(
    (id: number, card: Cards) => {
      console.log(game);
      game?.makeAStep(id, card);
    },
    [game],
  );

  console.log(handleCardClick);
  console.log(game);

  const [firstGamer, secondGamer] = gamers;

  return (
      <div className={styles.wrapper}>
        <GamerWithCards
          gamer={firstGamer}
          onCardClick={handleCardClick}
        />
        <GamerWithCards
          isMine
          isReverse
          gamer={secondGamer}
          onCardClick={handleCardClick}
        />
      </div>
  );
};

