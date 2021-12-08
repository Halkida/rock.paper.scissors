import { FC, useState, useRef, ChangeEvent, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import cx from 'classnames';
import { IUser } from '@/types';
import { Form } from '@/components/Form';
import { Button } from '@/components/Button';
import userServise from '@/services/user';
import styles from'./Avatar.module.scss';
import { loadSuccess, loadPending } from '@/store/user/actions';

type OwnProps = {
  avatar: string | undefined;
  initials?: string;
  isEditable?: boolean;
  getNotification?: (notification: string) => void;
  size?: 'small' | 'medium' | 'large';
};

const Avatar: FC<OwnProps> = ({ avatar, initials, isEditable, getNotification, size = 'medium' }) => {
  const dispatch = useDispatch();
  const elementImage = useRef<HTMLImageElement>(null);
  const elementInputFile = useRef<HTMLInputElement>(null);

  const [src, setSrc] = useState(avatar ? `https://ya-praktikum.tech/api/v2/resources${avatar}` : undefined);
  const [newAvatar, setNewAvatar] = useState(false);

  const validateImgFile = (file: File | undefined)  => {
    return !!file?.type.match('image.*');
  };

  const onInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const files: Nullable<FileList> = evt.target.files;
    if (!files?.[0]) {
      return;
    }
    if (!validateImgFile(files?.[0])) {
      return;
    }

    const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
          setNewAvatar(true);
          setSrc(e.target?.result as string);
          if (elementImage?.current) {
            elementImage.current.src = e.target?.result as string;
          }
      };
      reader.readAsDataURL(files?.[0]);
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const file = elementInputFile.current?.files?.[0];
    if (!file) {
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
  };

  const addDefaultSrc = () => {
    setSrc(avatar ? `https://ya-praktikum.tech/api/v2/resources${avatar}` : undefined);
  };

  const onCancelData = () => {
    addDefaultSrc();
    setNewAvatar(false);
  };

  return (
    <div className={cx([
      styles.avatar,
      { [styles.newAvatar]: newAvatar },
      { [styles.isEditable]: isEditable },
    ])}>
      <Form
        onSubmit={onSubmit}
        renderFields={ () => (
          <>
          <div className={styles.container}>
            <label
              className={cx([
                styles.avatar__wrapper,
                { [styles[`avatar__wrapper__${size}`]]: size },
            ])}
              htmlFor="avatar"
            >
            <img
              ref={elementImage}
              src={src}
              alt="avatar"
              className="avatar__image"
            />
            { !src && <span className={styles.avatar__default}>{ initials }</span>}
            <input
              ref={elementInputFile}
              type="file"
              onChange={onInputChange}
              id="avatar"
              className="visuallyHidden"
            />
            </label>
          </div>
          <div className={styles.avatar__buttonsWrapper}>
            <Button
              viewType="success"
              type="submit"
                className={styles.avatar__buttonSubmit}
              >
                Сохранить
              </Button>
              <Button
                viewType="danger"
                type="button"
                onClick={onCancelData}
                className={styles.avatar__buttonCancel}
              >
                Отменить
              </Button>
            </div>
          </>
        ) }
      />
    </div>
  );
};

export default Avatar;
