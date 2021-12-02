import { FC, SyntheticEvent } from 'react';
import cx from 'classnames';
import { Cards } from '@/RPS/constants';
import styles from './Card.module.scss';

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
          { [styles[`card_${type}`]]: !shirtUp },
        ])}
        disabled={disabled}
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