import { FC, SyntheticEvent } from 'react';
import cx from 'classnames';
import { Cards } from '@/RPS/constants';
import shirtCard from '@/assets/shirt-card.png';
import rockCard from '@/assets/rock-card.png';
import paperCard from '@/assets/paper-card.png';
import scissorsCard from '@/assets/scissors-card.png';
import styles from './Card.module.scss';

const cardImage: Record<Cards, string> = {
  [Cards.paper]: paperCard,
  [Cards.rock]: rockCard,
  [Cards.scissors]: scissorsCard,
};

type OwnProps = {
  count: number,
  disabled: boolean,
  isMine?: boolean,
  type: Cards,
  className?: string,
  onClick: (e: SyntheticEvent<HTMLButtonElement>) => void,
};

export const Card: FC<OwnProps> = ({
  count,
  disabled,
  isMine = false,
  type,
  className = '',
  onClick,
}) => {
  const shirtUp = !isMine;

  return (
    <div className={cx(styles.wrapper, className)}>
      <button
        type="button"
        className={cx([
          styles.card,
          { [styles.card_shirtUp]: shirtUp },
        ])}
        disabled={disabled}
        style={{
          backgroundImage: `url(${shirtUp ?
            shirtCard :
            cardImage[type]})`,
        }}
        onClick={onClick}
      />
      {isMine && (
        <div
          className={styles.count}
        >
          {count}
        </div>
      )}
    </div>
  );
};