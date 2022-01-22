import { FC, useRef, MouseEvent } from 'react';
import cx from 'classnames';
import styles from'./Avatar.module.scss';

type OwnProps = {
  className: string,
  avatarSrc: string | undefined;
  isEditable?: boolean;
  onClick?: (event: MouseEvent) => void
  initials?: string;
  size?: 'small' | 'medium' | 'large' | 'xsmall';
};

export const AvatarImg: FC<OwnProps> = ({
  className = '',
  avatarSrc,
  initials,
  isEditable,
  size = 'medium',
  onClick,
}) => {
  const elementAvatar = useRef<HTMLButtonElement>(null);

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
          src={avatarSrc}
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
          src={avatarSrc}
          alt="avatar"
          className={styles.avatar__image}
        />
        { !avatarSrc && <span className={styles.avatar__default}>{ initials }</span>}
      </div>}
    </>
  );
};
