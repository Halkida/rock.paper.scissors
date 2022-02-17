import { FC, ReactNode } from 'react';
import cx from 'classnames';
import { useClickOutside } from '@/hooks';
import { Button } from '@/components/Button';
import styles from'./Modal.module.scss';

export interface ModalProps {
  isShown: boolean;
  hide: () => void;
  children: ReactNode | string;
  headerText?: string;
  className?: string;
}

export const Modal: FC<ModalProps> = ({
  isShown,
  hide,
  children,
  headerText,
  className = ''
}) => {
  const { ref } = useClickOutside(false, hide);

  const modal = (
    <div className={cx([
      styles.modal,
      { [styles['modal--show']]: isShown },
    ])}>
      <div className={ styles.modal__backdrop } />
      <div
        ref={ref}
        className={ styles.modal__wrapper }
      >
        <div className={cx([
          styles.modal__styledModal,
          className
        ])}>
          <div className={ styles.modal__header }>
            { headerText && <p className={ styles.modal__headerText }>
              {headerText}
            </p> }
            <Button
              className={ styles.modal_buttonClose }
              onClick={ hide }
            >
              <span className="visuallyHidden">Закрыть</span>
            </Button>
          </div>
          <div className="modal__content">
            { children }
          </div>
        </div>
      </div>
    </div>
  );
  return isShown ? modal : null;
};
