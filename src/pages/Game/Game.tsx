import { FC, useEffect, useState, SyntheticEvent } from 'react';
import RPS from '@/RPS';
import Gamer from '@/RPS/Gamer';
import { cardsTitles, Cards } from '@/RPS/constants';
import styles from './Game.module.scss';

export const Game: FC = () => {
  
  const [game, setGame] = useState<RPS>();
  useEffect(() => {
    setGame(new RPS({
      gamers: [
        new Gamer({ id: 1 }),
        new Gamer({ id: 2 }),
      ],
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
        }) => (
          <div
            key={id}
          >
            <div>
              {`Gamer #${id}`}
            </div>
            {Object.keys(cardsTitles)
              .map((card: Cards) => (
                <button
                  key={card}
                  type="button"
                  data-card={card}
                  onClick={handleCardClick(id)}
                >
                  {cardsTitles[card]}
                </button>
              ))}
          </div>
        ))}
      </div>
    </main>
  );
};