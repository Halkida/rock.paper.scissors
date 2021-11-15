import { FC } from 'react';
import cx from 'classnames';
import styles from './UserItem.module.scss';

type OwnProps = {
  index: number;
  name: string;
  starsCount: number;
  className?: string;
};

const UserItem: FC<OwnProps> = function UserItem({
  index,
  name,
  starsCount,
  className = '',
}) {
  return (
    <div
      className={cx([
        className,
        styles.wrapper,
      ])}
    >
      <div className={styles.index}>
        {index}
      </div>
      <div className={styles.name}>
        {name}
      </div>
      <div className={styles.stars}>
        {starsCount}
      </div>
    </div>
  );
};

export default UserItem;