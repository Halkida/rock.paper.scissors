import { FC } from 'react';
import cx from 'classnames';
import styles from './Spinner.module.scss';

export const Spinner: FC = () => {
  return (
    <div className={styles.spinner}>
      <div className={cx([styles.blob, styles.top])} />
      <div className={cx([styles.blob, styles.bottom])} />
      <div className={cx([styles.blob, styles.left])} />
      <div className={cx([styles.blob, styles.moveBlob])} />
    </div>
  );
};