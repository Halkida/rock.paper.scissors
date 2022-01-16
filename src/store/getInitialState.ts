import { IState, UserState } from '@/types';

const userState: UserState = {
  status: 'pending',
  user: null,
  theme: null,
};

export const getInitialState = (): IState => ({
  user: userState,
});