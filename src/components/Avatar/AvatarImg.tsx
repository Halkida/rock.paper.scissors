import { FC, useRef, MouseEvent } from 'react';
import cx from 'classnames';
import styles from'./Avatar.module.scss';

type OwnProps = {
  avatarSrc: string | undefined;
  isEditable?: boolean;
  onClick?: (event: MouseEvent) => void
  initials?: string;
  size?: 'small' | 'medium' | 'large';
};

export const AvatarImg: FC<OwnProps> = ({ avatarSrc, initials, isEditable, onClick, size = 'medium' }) => {
  const elementAvatar = useRef<HTMLButtonElement>(null);
  const base64Src = !!avatarSrc?.match('base64');
  const scr = base64Src ? avatarSrc : `https://ya-praktikum.tech/api/v2/resources${avatarSrc}`;

  return (
    <>
      {isEditable ? 
      <button
        type="button"
        className={cx([
          styles.avatar,
          { [styles[`avatar__${size}`]]: size },
        ])}
        ref={ elementAvatar }
        onClick={onClick}
      >
        <img
          src={scr}
          alt="avatar"
          className={styles.avatar__image}
        />
        { !avatarSrc && <span className={styles.avatar__default}>{ initials }</span>}
      </button>
      : <div
        className={cx([
          styles.avatar,
          { [styles[`avatar__wrapper__${size}`]]: size },
        ])}
      >
        <img
          src={scr}
          alt="avatar"
          className={styles.avatar__image}
        />
        { !avatarSrc && <span className={styles.avatar__default}>{ initials }</span>}
      </div>}
    </>
  );
};