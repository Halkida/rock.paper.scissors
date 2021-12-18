import { FC, useCallback } from 'react';
import { useSelector } from 'react-redux';
import cx from 'classnames';
import { selectUser } from '@/store/user/selectors';
import { IUser, Notification } from '@/types';
import { GameStats } from '@/RPS';
import { Button } from '@/components/Button';
import Star from '@/icons/Star';
import IconStarSolid from '@/icons/StarSolid';
import { useNotificationAPI } from '@/hooks';
import styles from'./Finish.module.scss';

type OwnProps = {
  gameStats: Nullable<GameStats>;
  onGameComplete: () => void;
}

export const GameFinish: FC<OwnProps> = ({
  gameStats,
  onGameComplete
}) => {
  const user: IUser = useSelector(selectUser) as IUser;
  const isWinner = gameStats?.winnerId === user.id;
  const roundsCount = gameStats?.history.length;
  const resultTitle = isWinner ? 'Вы победили' : 'Вы проиграли';

  const title = isWinner ? 'Успех!' : 'Попробуй еще!';
  const body = isWinner ? 'У тебя получилось' : 'Когда-нибудь получится!';
  const notificationOptions: Notification = { title, body };
  const { notify } = useNotificationAPI();
  notify(notificationOptions);

  const handleGameComplete = useCallback(() => onGameComplete(), [onGameComplete]);

  return (
    <main className={styles.page}>
      <h1 className={styles.title}>
        Игра окончена
      </h1>
      <div className={styles.container}>
        <div className={styles.resultMessageContainer}>
          <h2 className={styles.resultTitle}>{resultTitle}</h2>
          <span className={styles.roundTitle}>на {roundsCount} ходу</span>
        </div>
        <div className={styles.list}>
          { gameStats &&
            gameStats.history.map((round) => {
              const isDraw = round.winnerId === null;
              const isRoundWinner = round.winnerId === user.id;
              const star = isDraw ? <Star /> : <IconStarSolid />;
              return (
                <div
                  key={round.round}
                  className={cx([
                    styles.star,
                    { [styles.star_lose]: !isDraw && !isRoundWinner }
                  ])}
                >
                  {star}
                </div>
              );
            })
          }
        </div>
        <Button view='outline' onClick={handleGameComplete} >Завершить</Button>
      </div>
    </main>
  );
};
