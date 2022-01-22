import { FC, SyntheticEvent } from 'react';
import { useSelector } from 'react-redux';
import cx from 'classnames';
import { Cards } from '@/RPS/constants';
import shirtCard from '@/assets/shirt-card.png';
import rockCard from '@/assets/rock-card.png';
import paperCard from '@/assets/paper-card.png';
import scissorsCard from '@/assets/scissors-card.png';
import { selectUserTheme } from '@/store/user/selectors';
import styles from './Card.module.scss';
import { THEMES } from '@/constants/themes';

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

  const theme = useSelector(selectUserTheme);

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
          className={cx([
            styles.count,
            {
              [styles.dark]: theme === THEMES.dark,
              [styles.light]: theme === THEMES.light,
            }
          ])}
        >
          {count}
        </div>
      )}
    </div>
  );
};