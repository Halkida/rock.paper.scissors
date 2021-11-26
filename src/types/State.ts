import { IUser } from './index';

type LoadStatus = 'success' | 'pending' | 'failed';

export type UserState = {
  user: Nullable<IUser>;
  status: LoadStatus;
};

export interface IState {
  user: UserState;
}