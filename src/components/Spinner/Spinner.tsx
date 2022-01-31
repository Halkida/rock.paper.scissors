import { FC } from 'react';
import cx from 'classnames';
import styles from './Spinner.module.scss';

type OwnProps = {
  type?: 'overlayed' | 'inline' | 'block',
  className?: string,
  isRevert?: boolean,
};

export const Spinner: FC<OwnProps> = ({
  type = 'overlayed',
  className = '',
  isRevert = false,
}) => {
  return (
    <div
      className={cx([
        styles.overlay,
        className,
        styles[type],
      ])}
    >
      <div
        className={cx([
          styles.spinner,
          { [styles.revert]: isRevert },
        ])}
      >
        <div className={cx([styles.blob, styles.top])} />
        <div className={cx([styles.blob, styles.bottom])} />
        <div className={cx([styles.blob, styles.left])} />
        <div className={cx([styles.blob, styles.moveBlob])} />
      </div>
    </div>
  );
};