import { FC, ReactNode } from 'react';
import classNames from 'classnames/bind';
import styles from'./Notification.module.scss';

type OwnProps = {
  className?: string,
  children: ReactNode | string;
}
type NotificationProps = FC<OwnProps>

const cx = classNames.bind(styles);

export const Notification: NotificationProps = function Notification({children, className = ''}) {
  const notificationClassNames = cx({
    [className]: true,
    ['notification']: true
  });

  return (
    <div className={notificationClassNames}>
      {children}
    </div>
  );
};