import { FC } from 'react';
import IconTimesSolid from '@/icons/TimesSolid';
import styles from './Error.module.scss';

const Error: FC = function Error() {
  return (
    <div>
      <IconTimesSolid />
      <div className={styles.title}>
        Ошибка
      </div>
    </div>
  );
};

export default Error;
