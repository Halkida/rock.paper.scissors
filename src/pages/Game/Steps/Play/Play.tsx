import { FC, useEffect, useState, SyntheticEvent } from 'react';
import RPS from '@/RPS';
import Gamer from '@/RPS/Gamer';
import { cardsTitles, Cards } from '@/RPS/constants';
import styles from './Play.module.scss';

type OwnProps = {
  withComputer?: boolean;
  onFinish: () => void;
};

export const Play: FC<OwnProps> = ({
  withComputer = true,
  onFinish,
}) => {
  const [gamers, setGamers] = useState<Gamer[]>([
    new Gamer({ id: 1 }),
    new Gamer({
      id: 2,
      type: withComputer ? 'computer' : 'person',
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

  const handleCardClick = (id: number) => (e: SyntheticEvent<HTMLButtonElement>) => {
    const { card }: { card?: Cards } = e.currentTarget.dataset;
    if (!card) {
      return;
    }
    game?.makeAStep(id, card)
  };

  return (
    <main>
      <div className={styles.gamers}>
        {game?.gamers.map(({
          id,
          type,
          cards,
          curCard,
          liveCount,
        }) => (
          <div
            key={id}
          >
            <div>
              {`Gamer #${id}`}
              <br />
              {`LiveCount: ${liveCount}`}
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

