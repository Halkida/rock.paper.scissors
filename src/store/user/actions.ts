import { Dispatch } from 'redux';
import AuthService from '@/services/auth';
import { IUser } from '@/types';
import { BaseActionType } from '@/types/redux';

export interface IUserAction extends BaseActionType<actions> {
  user: IUser;
}

export enum actions {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  SET_USER = 'SET_USER'
}

export function loadSuccess(user: IUser): IUserAction {
  return {
    type: actions.SUCCESS,
    user,
  };
}
export function loadFailed(): BaseActionType<actions> {
  return { type: actions.FAILED };
}
export function loadPending(): BaseActionType<actions> {
  return { type: actions.PENDING };
}
export function setUser(user: IUser): IUserAction {
  return { type: actions.SET_USER, user };
}

export const fetchUser = () => async (dispatch: Dispatch) => {
  try {
    dispatch(loadPending());
    const data = await AuthService.getUser();
    dispatch(loadSuccess(data));
  } catch (error) {
    dispatch(loadFailed());
  }
};
