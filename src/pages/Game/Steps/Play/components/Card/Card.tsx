import { FC, SyntheticEvent } from 'react';
import styles from './Card.module.scss';

type OwnProps = {
  count: number,
  disabled: boolean,
  onClick: (e: SyntheticEvent<HTMLButtonElement>) => void,
};

export const Card: FC<OwnProps> = ({
  count,
  disabled,
  onClick,
}) => {
  return (
    <div className={styles.wrapper}>
      <button
        type="button"
        className={styles.card}
        disabled={disabled}
        onClick={onClick}
      />
      <div
        className={styles.count}
      >
        {count}
      </div>
    </div>
  );
};