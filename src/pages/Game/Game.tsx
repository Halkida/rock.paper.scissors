import { FC, useState, useCallback, useRef } from 'react';
import IconPlay from '@/icons/Play';
import IconPause from '@/icons/Pause';
import { Button } from '@/components/Button';
import { useAudio } from '@/hooks';
import { GameStats } from '@/RPS';
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
  const audioWrapper = useRef<HTMLDivElement>(null);

  const {
    isPlaying,
    play,
    pause,
  } = useAudio({
    parent: audioWrapper?.current,
    isLoop: true,
  });
  const [step, setStep] = useState<Steps>(Steps.start);
  const [gameWithComputer, setGameWithComputer] = useState<boolean>();
  const [gameStats, setGameStats] = useState<Nullable<GameStats>>(null);
  const handleGameStart = useCallback(
    ({ withComputer }: OnGameStartParams) => {
      setStep(Steps.play);
      setGameWithComputer(withComputer);
      play();
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
  const handleSoundClick = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [pause, play, isPlaying]);
  const handleGameComplete = useCallback(() => setStep(Steps.start), []);

  return (
    <main className={styles.page}>
      <div ref={audioWrapper} />
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
      <Button
        view="outline"
        className={styles.soundButton}
        onClick={handleSoundClick}
      >
        {!isPlaying ? <IconPlay /> : <IconPause />}
      </Button>
    </main>
  );
};