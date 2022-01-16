import { Themes } from '@/constants/themes';
import { IUser } from './index';

type LoadStatus = 'success' | 'pending' | 'failed';

export type UserState = {
  user: Nullable<IUser>;
  status: LoadStatus;
  theme: Nullable<Themes>;
};

export interface IState {
  user: UserState;
}