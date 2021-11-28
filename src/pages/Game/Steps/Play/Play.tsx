import { FC, useEffect, useState, SyntheticEvent, useCallback } from 'react';
import RPS from '@/RPS';
import Gamer from '@/RPS/Gamer';
import { cardsTitles, Cards } from '@/RPS/constants';
import GamerView from './components/Gamer';
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
      info: mocks.firstGamer,
    }),
    new Gamer({
      id: 2,
      type: withComputer ? 'computer' : 'person',
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
    (id: number) => (e: SyntheticEvent<HTMLButtonElement>) => {
      const { card }: { card?: Cards } = e.currentTarget.dataset;
      if (!card) {
        return;
      }
      game?.makeAStep(id, card);
    },
    [game],
  );

  const firstGamer = gamers[0];

  return (
    <main>
      <div className={styles.gamers}>
        <GamerView
          avatar={firstGamer.info?.avatar}
          fullName={firstGamer.info?.nickName}
          score={firstGamer.score}
        />
        {game?.gamers.map(({
          id,
          type,
          cards,
          curCard,
          score,
        }) => (
          <div
            key={id}
          >
            <div>
              {`Gamer #${id}`}
              <br />
              {`LiveCount: ${score}`}
            </div>

            {Object.keys(cards)
              .map((card: Cards) => {
                const isDisabled = cards[card] === 0
                  || Boolean(curCard)
                  || type === 'computer';
                return (
                  <div
                    key={card}
                  >
                    <button
                      type="button"
                      data-card={card}
                      disabled={isDisabled}
                      onClick={handleCardClick(id)}
                    >
                      {cardsTitles[card]}
                    </button>
                    <div>
                      {cards[card]}
                    </div>
                  </div>
                );
              })}
          </div>
        ))}
      </div>
    </main>
  );
};

