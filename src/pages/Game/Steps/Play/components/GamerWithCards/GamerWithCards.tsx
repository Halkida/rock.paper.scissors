import { FC, useCallback } from 'react';
import cx from 'classnames';
import Gamer from '@/RPS/Gamer';
import { Cards } from '@/RPS/constants';
import GamerView from '../Gamer';
import CardView from '../Card';
import styles from './GamerWithCards.module.scss';

type OwnProps = {
  isMine?: boolean,
  isReverse?: boolean,
  gamer: Gamer,
  className?: string,
  disabled?: boolean,
  onCardClick: (id: number, card: Cards) => void,
};

export const GamerWithCards: FC<OwnProps> = ({
  isMine = false,
  isReverse = false,
  gamer,
  className,
  disabled = false,
  onCardClick,
}) => {
  const handleCardClick = useCallback(
    (id: number, card: Cards) => () => {
      onCardClick(id, card);
    },
    [onCardClick],
  );

  return (
    <div
      className={cx([
        className,
        styles.gamer,
        { [styles.reverse]: isReverse },
      ])}
    >
      <GamerView
        avatar={gamer.info?.avatar || undefined}
        fullName={gamer.info?.login}
        className={styles.gamerView}
        isReverse={isReverse}
        score={gamer.score}
      />
      <div className={styles.cards}>
        {Object.keys(gamer.cards)
            .map((card: Cards) => {
              const isDisabled = gamer.cards[card] === 0 ||
                Boolean(gamer.curCard) ||
                gamer.type === 'computer';
              return (
                <CardView
                  key={card}
                  type={card}
                  isMine={isMine}
                  disabled={isDisabled || disabled}
                  count={gamer.cards[card]}
                  className={styles.card}
                  onClick={handleCardClick(gamer.id, card)}
                />
              );
            })}
      </div>
    </div>
  );
};

