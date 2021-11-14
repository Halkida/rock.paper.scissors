import { FC } from 'react';
import styles from'./Notification.module.scss';

type OwnProps = {
   text: string
}
type NotificationProps = FC<OwnProps>

export const Notification: NotificationProps = function Notification({text}) {
  return (
    <div className={styles.notification}>
      {text}
    </div>
  );
};