import { FC, useState, useCallback, useRef, FormEvent, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import cx from 'classnames';
import styles from'./AvatarModal.module.scss';
import { Button } from '@/components/Button';
import { IUser } from '@/types';
import { Modal } from '@/components/Modal';
import { Form } from '@/components/Form';
import { AvatarImg } from '@/components/Avatar';
import userServise from '@/services/user';
import { loadSuccess, loadPending } from '@/store/user/actions';

interface AvatarModalProps {
  isShown: boolean;
  toggle: () => void;
  avatarSrc: string | undefined;
  avatarSize?: 'small' | 'medium' | 'large';
  getNotification?: (notification: string) => void;
}

export const AvatarModal: FC<AvatarModalProps> = ({ isShown, toggle, avatarSrc, avatarSize = 'medium', getNotification }) => {
  const dispatch = useDispatch();
  const elementInputFile = useRef<HTMLInputElement>(null);
  const [newSrc, setNewSrc] = useState('');

  const validateImgFile = (file: File | undefined)  => {
    return !!file?.type.match('image.*');
  };

  const onInputChange = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
    const files: Nullable<FileList> = evt.target.files;
    if (!files?.[0]) {
      return;
    }
    if (!validateImgFile(files?.[0])) {
      return;
    }

    const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
          setNewSrc(e.target?.result as string);
      };
      reader.readAsDataURL(files?.[0]);
  }, []);

  const onSubmit = useCallback((event: FormEvent) => {
    event.preventDefault();
    const file = elementInputFile.current?.files?.[0];
    if (!file) {
      return;
    }
    if (!validateImgFile(file)) {
      return;
    }
    const form = new FormData();
    form.append('avatar', file);
    dispatch(loadPending());
    userServise.changeAvatar(form)
      .then((response) => {
        dispatch(loadSuccess(response as IUser));
      })
      .catch((error: Error) => {
        console.error(error.message);
        if (!getNotification) {
          return;
        }
        getNotification(error.message);
      });
  }, []);

  const clearInputAvatar = () => {
    if (elementInputFile && elementInputFile?.current) {
      elementInputFile.current.value = '';
      setNewSrc('');
    }
  }

  const onCancelModal = () => {
    clearInputAvatar();
    toggle();
  }

  const content = <div className={ styles.avatarModal }>
    <AvatarImg
      avatarSrc={ newSrc || avatarSrc }
      size={ avatarSize }
    />
    <Form
      className={ styles.avatarModal__form }
      onSubmit={ onSubmit }
      renderFields={ () => (
        <>
        <label
          className={cx([
            styles.avatarModal__input,
            { ['visuallyHidden']: newSrc },
          ])}
          htmlFor="avatar"
        >
          Выберите файл
        <input
          ref={ elementInputFile }
          type="file"
          onChange={ onInputChange }
          id="avatar"
          className="visuallyHidden"
        />
        </label>
        <div
          className={cx([
            styles.avatarModal__buttonsWrapper,
            { ['visuallyHidden']: !newSrc },
          ])}
        >
            <Button
              viewType="success"
              type="submit"
                className={ styles.avatarModal__buttonSubmit }
              >
                Сохранить
              </Button>
              <Button
                viewType="danger"
                type="button"
                onClick={ onCancelModal }
                className={ styles.avatarModal__buttonCancel }
              >
                Отменить
              </Button>
            </div>
            </>
        )}
    />
  </div>;
  return (
    <Modal isShown={ isShown } hide={ onCancelModal }>
      { content }
    </Modal>
  );
};
