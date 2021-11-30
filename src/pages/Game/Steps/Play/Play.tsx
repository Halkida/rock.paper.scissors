import { FC, useEffect, useState, useCallback } from 'react';
import RPS from '@/RPS';
import Gamer from '@/RPS/Gamer';
import { Cards } from '@/RPS/constants';
import GamerView from './components/Gamer';
import CardView from './components/Card';
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
    (id: number, card: Cards) => () => {
      game?.makeAStep(id, card);
    },
    [game],
  );

  const [firstGamer, secondGamer] = gamers;

  return (
    <div>
      <div className={styles.gamers}>
        <div className={styles.gamer}>
          <GamerView
            avatar={firstGamer.info?.avatar}
            fullName={firstGamer.info?.nickName}
            score={firstGamer.score}
          />
          <div className={styles.cards}>
            {Object.keys(firstGamer.cards)
                .map((card: Cards) => {
                  const isDisabled = firstGamer.cards[card] === 0 ||
                    Boolean(firstGamer.curCard) ||
                    firstGamer.type === 'computer';
                  return (
                    <CardView
                      key={card}
                      type={card}
                      disabled={isDisabled}
                      count={firstGamer.cards[card]}
                      onClick={handleCardClick(firstGamer.id, card)}
                    />
                  );
                })}
          </div>
        </div>
        <div className={styles.gamer}>
          <GamerView
            avatar={secondGamer.info?.avatar}
            fullName={secondGamer.info?.nickName}
            score={secondGamer.score}
          />
          <div className={styles.cards}>
            {Object.keys(secondGamer.cards)
                .map((card: Cards) => {
                  const isDisabled = secondGamer.cards[card] === 0 ||
                    Boolean(secondGamer.curCard) ||
                    secondGamer.type === 'computer';
                  return (
                    <CardView
                      key={card}
                      type={card}
                      isMine
                      disabled={isDisabled}
                      count={secondGamer.cards[card]}
                      onClick={handleCardClick(secondGamer.id, card)}
                    />
                  );
                })}
          </div>
        </div>
      </div>
    </div>
  );
};

