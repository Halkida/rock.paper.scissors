import { FC } from 'react';
import SVGContainer from './SVGContainer';

type OwnProps = {
  className?: string,
};

const Pause: FC<OwnProps> = function IconPause({
  className = '',
}) {
  return (
    <SVGContainer
      height={512}
      witdh={448}
      className={className}
    >
      <path d="M144 479H48c-26.5 0-48-21.5-48-48V79c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v352c0 26.5-21.5 48-48 48zm304-48V79c0-26.5-21.5-48-48-48h-96c-26.5 0-48 21.5-48 48v352c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48z"/>
    </SVGContainer>
  );
};

export default Pause;
