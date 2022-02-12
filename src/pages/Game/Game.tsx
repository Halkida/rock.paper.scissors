import { FC, useState, useCallback, useEffect, useRef } from 'react';
import { GameStats } from '@/RPS';
import { RPSAudio } from '@/modules/audio';
import Start, { OnGameStartParams } from './Steps/Start';
import Play from './Steps/Play';
import Finish from './Steps/Finish';
import styles from './Game.module.scss';

enum Steps {
  start = 'start',
  play = 'play',
  finish = 'finish',
}

export const Game: FC = () => {
  const [step, setStep] = useState<Steps>(Steps.start);
  const [gameWithComputer, setGameWithComputer] = useState<boolean>();
  const [gameStats, setGameStats] = useState<Nullable<GameStats>>(null);
  const handleGameStart = useCallback(
    ({ withComputer }: OnGameStartParams) => {
      setStep(Steps.play);
      setGameWithComputer(withComputer);
    },
    [setStep, setGameWithComputer, Steps]
  );
  const handleGameFinish = useCallback(
    (gameStats) => {
      setGameStats(gameStats);
      setStep(Steps.finish);
    },
    [setStep],
  );
  const handleGameComplete = useCallback(() => setStep(Steps.start), []);
  const audioElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (audioElement.current) {
      new RPSAudio({
        parent: audioElement.current,
      });
    }
  }, [audioElement]);

  return (
    <main className={styles.page}>
      <div ref={audioElement} />
      {(step === Steps.start) && (
        <Start
          onGameStart={handleGameStart}
        />
      )}
      {(step === Steps.play) && (
        <Play
          withComputer={gameWithComputer}
          onFinish={handleGameFinish}
        />
      )}
      {(step === Steps.finish) && (
        <Finish gameStats={gameStats} onGameComplete={handleGameComplete} />
      )}
    </main>
  );
};