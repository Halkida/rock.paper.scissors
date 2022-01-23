import { THEMES } from '@/constants/themes';
import { IState, UserState } from '@/types';

const userState: UserState = {
  status: 'pending',
  user: null,
  theme: THEMES.dark,
};

export const getInitialState = (): IState => ({
  user: userState,
});