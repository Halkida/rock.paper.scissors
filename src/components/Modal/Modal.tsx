import { FC } from 'react';
import { createPortal } from 'react-dom';
import { useClickOutside } from '@/hooks';
import { Button } from '@/components/Button';
import styles from'./Modal.module.scss';

export interface ModalProps {
  isShown: boolean;
  hide: () => void;
  modalContent: JSX.Element;
  headerText?: string;
}

export const Modal: FC<ModalProps> = ({
  isShown,
  hide,
  modalContent,
  headerText,
}) => {
  const { ref, isClickOutside } = useClickOutside(false, hide)
  console.log('isClickOutside', isClickOutside);

  const modal = (
    <>
      <div className={styles.modal__backdrop} />
      <div
        ref={ref}
        className={styles.modal__wrapper}
      >
        <div className={styles.modal__styledModal}>
          <div className={styles.modal__header}>
            { headerText && <p className={styles.modal__headerText}>
              {headerText}
            </p> }
            <Button
              className={styles.modal_buttonClose}
              onClick={hide}
            >
              <span className="visuallyHidden">Закрыть</span>
            </Button>
          </div>
          <div className="modal__content">
            {modalContent}
          </div>
        </div>
      </div>
    </>
  );
  return isShown ? createPortal(modal, document.body) : null;
};
