import { Component, ReactNode } from 'react';
import IconTimesSolid from '@/icons/TimesSolid';
import styles from './ErrorBoundary.module.scss';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className={styles.wrapper}>
          <div className={styles.iconWrapper}>
            <IconTimesSolid />
          </div>
          <div className={styles.title}>
            Ошибка
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
