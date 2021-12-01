import { FC, useEffect, useState, SyntheticEvent, useCallback } from 'react';
import { useSelector } from 'react-redux';
import RPS, { GameStats } from '@/RPS';
import Gamer from '@/RPS/Gamer';
import { selectUser } from '@/store/user/selectors';
import { IUser } from '@/types';
import { cardsTitles, Cards } from '@/RPS/constants';
import styles from './Play.module.scss';

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
    new Gamer({ id: user.id }),
    new Gamer({
      id: 0,
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
      onGameFinished(gameStats) {
        onFinish(gameStats);
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

