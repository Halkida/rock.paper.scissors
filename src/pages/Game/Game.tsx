import { FC, useState } from 'react';
import Start, { OnGameStartParams } from './Steps/Start';
import Play from './Steps/Play';
import Finish from './Steps/Finish';
// import { cardsTitles, Cards } from '@/RPS/constants';
// import styles from './Game.module.scss';

enum Steps {
  start = 'start',
  play = 'play',
  finish = 'finish',
};

// const viewSteps = {
//   [Steps.start]: Start,
// };

type OwnProps = {};

export const Game: FC<OwnProps> = () => {
  const [step, setStep] = useState<Steps>(Steps.start);
  const [gameWithComputer, setGameWithComputer] = useState<boolean>();
  const handleGameStart = ({ withComputer }: OnGameStartParams) => {
    setStep(Steps.play);
    setGameWithComputer(withComputer);
  };
  const handleGameFinish = () => {
    setStep(Steps.finish);
  };
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