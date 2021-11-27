import { FC } from 'react';
import { useSelector } from 'react-redux';
import { IState, IUser } from '@/types';

export const Profile: FC = () => {
  const user: Nullable<IUser> = useSelector((state: IState) => state.user.user);
  const keys = user && Object.keys(user) as (keyof IUser)[];
  return (
    <main>
      <h1>Profile</h1>
      {keys && keys.length > 0 && (
        <ul>
          {keys.map((key) => (
            <li key={key}>
              <span>{`${key}: `}</span>
              <span>{user[key]}</span>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
};