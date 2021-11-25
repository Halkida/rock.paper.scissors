import { IUser, UserState } from '@/types';

enum actions {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  SET_USER = 'SET_USER'
}
type KeyofActions = keyof typeof actions;

const defaultState: UserState = {
  status: 'pending',
  user: null,
};

interface BaseActionType<T> {
  type: T;
}

interface ItemActionType extends BaseActionType<KeyofActions> {
  user: IUser;
}

export function userReducer(state: UserState = defaultState, {type, user}: ItemActionType = {} as ItemActionType): UserState {
  switch (type) {
    case actions.PENDING:
      return {
        ...state,
        status: 'pending'
      };
    case actions.SUCCESS:
      return {
        ...state,
        status: 'success'
      };
    case actions.FAILED:
      return {
        ...state,
        status: 'failed'
      };
    case actions.SET_USER:
      return {
        ...state,
        user
      };
    default:
      return state;
  }
}

export function loadSuccess(): BaseActionType<KeyofActions> {
  return {type: actions.SUCCESS};
}
export function loadFailed(): BaseActionType<KeyofActions> {
  return {type: actions.FAILED};
}
export function loadPending(): BaseActionType<KeyofActions> {
  return {type: actions.PENDING};
}
export function setUser(user: IUser): ItemActionType {
  return {type: actions.SET_USER, user: user};
}