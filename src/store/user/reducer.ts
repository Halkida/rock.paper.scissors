import { UserState } from '@/types';
import { actions, IUserAction } from './actions';

const defaultState: UserState = {
  status: 'pending',
  user: null,
};

export function userReducer(
  state: UserState = defaultState,
  { type, user }: IUserAction,
): UserState {
  switch (type) {
    case actions.PENDING:
      return {
        ...state,
        status: 'pending',
      };
    case actions.SUCCESS:
      return {
        ...state,
        user: {...user, avatar: user.avatar ? `https://ya-praktikum.tech/api/v2/resources${user.avatar}` : null},
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
        user: {...user, avatar: user.avatar ? `https://ya-praktikum.tech/api/v2/resources${user.avatar}` : null},
      };
    default:
      return state;
  }
}
