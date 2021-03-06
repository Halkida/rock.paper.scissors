import { FC } from 'react';
import cx from 'classnames';
import IconTrophySolid from '@/icons/TrophySolid';
import IconStarSolid from '@/icons/StarSolid';
import styles from './UserItem.module.scss';

type OwnProps = {
  index: number;
  name: string;
  score: number;
  className?: string;
};

const UserItem: FC<OwnProps> = function UserItem({
  index,
  name,
  score,
  className = '',
}) {
  const isThreeFirst = index <= 3;

  return (
    <div
      className={cx([
        className,
        styles.wrapper,
      ])}
    >
      <div className={cx([
        styles.index,
        { [styles.index_threeFirst]: isThreeFirst },
      ])}>
        {isThreeFirst ? <IconTrophySolid /> : `${index}.`}
      </div>
      <div>
        {name}
      </div>
      <div className={styles.stars}>
        <div
          className={cx([
            styles.stars_icon,
            { [styles.stars_iconThreeFirst]: isThreeFirst }
          ])}
        >
          <IconStarSolid />
        </div>
        <div className={styles.stars_number}>
          {score}
        </div>
      </div>
    </div>
  );
};

export default UserItem;