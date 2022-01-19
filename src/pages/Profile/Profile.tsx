import { FC, useState, MouseEvent } from 'react';
import styles from'./Profile.module.scss';
import { useSelector } from 'react-redux';
import cx from 'classnames';
import { IUser } from '@/types';
import { selectUser } from '@/store/user/selectors';
import { useModal } from '@/components/Modal';
import { Button } from '@/components/Button';
import UserFormData from '@/pages/Profile/Forms/UserFormData';
import UserFormPassword from '@/pages/Profile/Forms/UserFormPassword';
import { AvatarImg, AvatarModal } from '@/components/Avatar';
import { Notification } from '@/components/Notification';

export const Profile: FC = () => {
  const [isEditData, setIsEditData] = useState(false);
  const [isEditPassword, setIsEditPassword] = useState(false);
  const [isEditAvatar, setIsEditAvatar] = useState(false);
  const [notification, setNotification] = useState('');
  const { isShown, toggle } = useModal();
  const changeData = () => {
    setIsEditPassword(false);
    setIsEditAvatar(false);
    setIsEditData(!isEditData);
  };

  const changePassword = () => {
    setIsEditData(false);
    setIsEditAvatar(false);
    setIsEditPassword(!isEditPassword);
  };

  const changeAvatar = (event: MouseEvent) => {
    event.stopPropagation();
    setIsEditData(false);
    setIsEditPassword(false);
    setIsEditAvatar(!isEditAvatar);
    toggle();
  };

  const user: Nullable<IUser> = useSelector(selectUser) as IUser;
  const defaultAvatarText =  user?.first_name?.[0] + user?.second_name?.[0] || '';
  const avatarSrc = user?.avatar || undefined;

  return (
    <main className={styles.content}>
    { notification && <Notification>{notification}</Notification> }
      <AvatarImg
        avatarSrc={avatarSrc}
        initials={defaultAvatarText}
        isEditable
        onClick={changeAvatar}
        size="large"
      />
      <div className={ cx([
        styles.profilePage__formsWrapper,
        { [styles.profilePage__formsWrapperIsEditPassword]: isEditPassword },
        { [styles.profilePage__formsWrapperIsEditData]: isEditData },
    ])}>
        <UserFormData
          isEdit={isEditData}
          isEditPassword={isEditPassword}
          onEdit={changeData}
          getNotification={setNotification}
        />
        <UserFormPassword
          isEdit={isEditPassword}
          onEdit={changePassword}
          getNotification={setNotification}
        />
      </div>
      <div className={ styles.profilePage__buttonsWrapper }>
        <Button
          type="button"
          onClick={changeData}
          className={styles.profilePage__buttonChange}
        >
          Изменить данные
        </Button>
        <Button
          type="button"
          onClick={changePassword}
          className={styles.profilePage__buttonChange}
        >
          Изменить пароль
        </Button>
      </div>
      <AvatarModal
        isShown={isShown}
        toggle={toggle}
        avatarSrc={user.avatar || undefined}
      />
    </main>
  );
};