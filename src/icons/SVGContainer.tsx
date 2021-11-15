import { FC } from 'react';

type OwnProps = {
  height: number,
  witdh: number,
  className?: string,
}

const SVGContainer: FC<OwnProps> = function SVGContainer({
  children,
  height,
  witdh,
  className = '',
}) {
  return (
    <svg
      focusable="false"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${witdh} ${height}`}
      height="1em"
      fill="currentColor"
      className={className}
    >
      {children}
    </svg>
  );
};

export default SVGContainer;
