import { FC, useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { IUser } from '@/types';
import RPS, { GameStats } from '@/RPS';
import Gamer from '@/RPS/Gamer';
import { Cards } from '@/RPS/constants';
import { selectUser } from '@/store/user/selectors';
import GamerWithCards from './components/GamerWithCards';
import Canvas from './components/Canvas';
import styles from './Play.module.scss';
import * as mocks from './mocks';

type OwnProps = {
  withComputer?: boolean;
  onFinish: (gameStats: GameStats) => void;
};

export const GamePlay: FC<OwnProps> = ({
  withComputer = true,
  onFinish,
}) => {
  const user: IUser = useSelector(selectUser) as IUser;
  const [gamers, setGamers] = useState<Gamer[]>([
    new Gamer({
      id: mocks.computerGamer.id,
      type: withComputer ? 'computer' : 'person',
      info: mocks.computerGamer,
    }),
    new Gamer({ id: user.id }),
  ]);
  const [game, setGame] = useState<RPS>();
  useEffect(() => {
    setGame(new RPS({
      gamers,
      onGameStarted(gamers) {
        setGamers([...gamers]);
      },
      onGamerMadeAStep(gamers) {
        setGamers([...gamers]);
      },
      onGameFinished(gameStats) {
        onFinish(gameStats);
      },
    }));
  }, []);

  const handleCardClick = useCallback(
    (id: number, card: Cards) => {
      game?.makeAStep(id, card);
    },
    [game],
  );

  const [firstGamer, secondGamer] = gamers;

  return (
      <div className={styles.wrapper}>
        <GamerWithCards
          gamer={firstGamer}
          onCardClick={handleCardClick}
        />
        <Canvas />
        <GamerWithCards
          isMine
          isReverse
          gamer={secondGamer}
          onCardClick={handleCardClick}
        />
      </div>
  );
};

