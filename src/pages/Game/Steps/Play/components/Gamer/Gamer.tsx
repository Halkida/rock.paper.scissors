import { FC, useMemo } from 'react';
import styles from './Gamer.module.scss';
import IconStarSolid from '@/icons/StarSolid';
import IconUserSolid from '@/icons/UserSolid';

type OwnProps = {
  avatar?: string,
  fullName?: string,
  score: number,
};

export const Gamer: FC<OwnProps> = ({
  avatar,
  fullName = 'Неизвестный игрок',
  score,
}) => {
  const scoreArray = useMemo(() => Array.from(
    { length: score },
    (_, i) => i,
  ), [score]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.user}>
        <div className={styles.avatar}>
          {avatar ? (
            <img
              className={styles.avatar_image}
            />
          ) : (
            <IconUserSolid className={styles.avatar_icon}/>
          )}
        </div>
        <div className={styles.fullName}>
          {fullName}
        </div>
      </div>
      <div className={styles.score}>
        {scoreArray.map((item) => (
          <div
            key={item}
            className={styles.score_iconWrapper}
          >
            <IconStarSolid
              className={styles.score_icon}
            />
          </div>
        ))}
      </div>
    </div>
  );
};