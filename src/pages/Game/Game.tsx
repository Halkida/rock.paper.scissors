import { FC, useState, useCallback } from 'react';
import Start, { OnGameStartParams } from './Steps/Start';
import Play from './Steps/Play';
import Finish from './Steps/Finish';

enum Steps {
  start = 'start',
  play = 'play',
  finish = 'finish',
}

export const Game: FC = () => {
  const [step, setStep] = useState<Steps>(Steps.start);
  const [gameWithComputer, setGameWithComputer] = useState<boolean>();
  const handleGameStart = useCallback(
    ({ withComputer }: OnGameStartParams) => {
      setStep(Steps.play);
      setGameWithComputer(withComputer);
    },
    [setStep, setGameWithComputer, Steps]
  );
  const handleGameFinish = useCallback(
    (gameStats) => {
      console.log(gameStats);
      setStep(Steps.finish);
    },
    [setStep],
  );
  return (
    <main>
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
        <Finish />
      )}
    </main>
  );
};