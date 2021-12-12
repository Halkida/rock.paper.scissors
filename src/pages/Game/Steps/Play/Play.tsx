import { FC, useEffect, useState, useCallback, useRef, useMemo } from 'react';
import { useSelector } from 'react-redux';
import cx from 'classnames';
import { IUser } from '@/types';
import RPS, { GameStats } from '@/RPS';
import RPSCanvas from './RPSCanvas';
import Gamer from '@/RPS/Gamer';
import { Cards } from '@/RPS/constants';
import { selectUser } from '@/store/user/selectors';
import GamerWithCards from './components/GamerWithCards';
import styles from './Play.module.scss';
import * as mocks from './mocks';
import { Button } from '@/components/Button';

type OwnProps = {
  withComputer?: boolean;
  onFinish: (gameStats: GameStats) => void;
};

export const GamePlay: FC<OwnProps> = ({
  withComputer = true,
  onFinish,
}) => {
  const canvas = useRef<HTMLCanvasElement>(null);
  const user: IUser = useSelector(selectUser) as IUser;
  const [gamers, setGamers] = useState<Gamer[]>([
    new Gamer({
      id: mocks.computerGamer.id,
      type: withComputer ? 'computer' : 'person',
      info: mocks.computerGamer,
    }),
    new Gamer({ id: user.id }),
  ]);
  const rPSCanvas = useMemo(() => (canvas.current ?
    new RPSCanvas(
      canvas.current,
      {
        width: 500,
        height: 250,
      }
    ) : null), [canvas.current]);
  const game = useRef<RPS>();
  const [shouldShowButton, setShouldShowButton] = useState(false);
  useEffect(() => {
    game.current = new RPS({
      gamers,
      onGameStarted(gamers) {
        setGamers([...gamers]);
      },
      onGamerMadeAStep(gamers) {
        setGamers([...gamers]);
        setShouldShowButton(false);
        rPSCanvas?.drawCards(gamers.map(({ curCard }) => ({
          type: curCard,
          shouldShow: false,
        })), true);
      },
      onRoundIsOver(gamers) {
        setGamers([...gamers]);
        setShouldShowButton(true);
        rPSCanvas?.drawCards(gamers.map(({ curCard }) => ({
          type: curCard,
          shouldShow: false,
        })));
      },
      onGameFinished(gameStats) {
        onFinish(gameStats);
      },
    });
  }, [rPSCanvas]);

  const handleCardClick = useCallback(
    (id: number, card: Cards) => {
      game.current?.makeAStep(id, card);
    },
    [game],
  );

  const handleButtonClick = useCallback(
    () => {
      setShouldShowButton(false);
      rPSCanvas?.drawStart();
    },
    [rPSCanvas],
  );

  const [firstGamer, secondGamer] = gamers;

  return (
    <div className={styles.wrapper}>
      <GamerWithCards
        gamer={firstGamer}
        onCardClick={handleCardClick}
      />
      <div className={styles.canvasWrapper}>
        <canvas
          ref={canvas}
          className={styles.canvas}
        >
          Для просмотра анимации воспользуйтесь браузером, который поддерживает технологию canvas
        </canvas>
      </div>
      <div >
        <Button
          className={cx([
            styles.button,
            { [styles.hidden]: !shouldShowButton },
          ])}
          onClick={handleButtonClick}
        >
          Сбросить карты
        </Button>
      </div>
      <GamerWithCards
        isMine
        isReverse
        gamer={secondGamer}
        onCardClick={handleCardClick}
      />
    </div>
  );
};

