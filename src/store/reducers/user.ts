import { IUser, UserState } from '@/types';

type userActions = {
  PENDING: string;
  SUCCESS: string;
  FAILED: string;
  SET_USER: string;
}

const actions: userActions = {
  PENDING: 'PENDING',
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED',
  SET_USER: 'SET_USER'
};

const defaultState: UserState = {
  status: 'pending',
  user: null,
};

interface BaseActionType<T> {
  type: T;
}

interface ItemActionType extends BaseActionType<keyof userActions> {
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

export function loadSuccess(): BaseActionType<keyof userActions> {
  return {type: actions.SUCCESS as keyof userActions};
}
export function loadFailed(): BaseActionType<keyof userActions> {
  return {type: actions.FAILED as keyof userActions};
}
export function loadPending(): BaseActionType<keyof userActions> {
  return {type: actions.PENDING as keyof userActions};
}
export function setUser(user: IUser): ItemActionType {
  return {type: actions.SET_USER as keyof userActions, user: user};
}