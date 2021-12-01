import { FC } from 'react';
import UserFormData from '@/pages/Profile/UserFormData';
import UserFormPassword from '@/pages/Profile/UserFormPassword';
import styles from'./Profile.module.scss';
import { useSelector } from 'react-redux';
import { IUser } from '@/types';
import { selectUser } from '@/store/user/selectors';

export const Profile: FC = () => {
  const user: Nullable<IUser> = useSelector(selectUser) as IUser;
  const defaultAvatarText =  user?.first_name[0] + user?.second_name[0] || '';
  
  const onChangeAvatar = () => {}
  return (
    <main className={styles.content}>
      <div className={styles.container}>
        <label className={styles.avatar__wrapper} htmlFor="avatar">
        <img src="" alt="" />
        <input type="file" onChange={onChangeAvatar} />
        <span className={styles.avatar__default}>{ defaultAvatarText }</span>
        </label>
      </div>
      <UserFormData />
      <UserFormPassword />
    </main>
  );
};