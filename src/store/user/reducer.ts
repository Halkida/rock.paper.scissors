import { Themes } from '@/constants/themes';
import { UserState } from '@/types';
import { actions, IUserAction } from './actions';

const defaultState: UserState = {
  status: 'pending',
  user: null,
  theme: null,
};

export function userReducer(
  state: UserState = defaultState,
  { type, payload = {} }: IUserAction,
): UserState {
  const { user, theme } = payload;
  switch (type) {
    case actions.PENDING:
      return {
        ...state,
        status: 'pending',
      };
    case actions.SUCCESS:
      return {
        ...state,
        user: user ?
          {...user, avatar: user?.avatar ? `https://ya-praktikum.tech/api/v2/resources${user.avatar}` : null} :
          null,
        status: 'success',
      };
    case actions.FAILED:
      return {
        ...state,
        status: 'failed',
      };
    case actions.SET_USER:
      return {
        ...state,
        user: user ?
          {...user, avatar: user?.avatar ? `https://ya-praktikum.tech/api/v2/resources${user.avatar}` : null} :
          null,
      };
    case actions.SET_USER_THEME:
        return {
          ...state,
          theme: theme || Themes.dark,
        };
    default:
      return state;
  }
}
