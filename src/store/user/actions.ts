import { Dispatch } from 'redux';
import AuthService from '@/services/auth';
import ThemeService from '@/services/theme';
import { IUser, IState } from '@/types';
import { BaseActionType } from '@/types/redux';
import { THEMES } from '@/constants/themes';

export interface IUserAction extends BaseActionType<actions> {
  payload: {
    user?: IUser;
    theme?: THEMES,
  },
}

export enum actions {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  SET_USER = 'SET_USER',
  SET_USER_THEME = 'SET_USER_THEME',
}

export function loadSuccess(user?: IUser): IUserAction {
  return {
    type: actions.SUCCESS,
    payload: { user },
  };
}
export function loadFailed(): BaseActionType<actions> {
  return { type: actions.FAILED };
}
export function loadPending(): BaseActionType<actions> {
  return { type: actions.PENDING };
}
export function setUser(user: IUser): IUserAction {
  return { type: actions.SET_USER, payload: { user } };
}

export function setUserTheme(theme: THEMES): IUserAction {
  return { type: actions.SET_USER_THEME, payload: { theme } };
}

export const postTheme = (theme: THEMES) => async (dispatch: Dispatch, getState: () => IState) => {
  const state = getState();
  dispatch(setUserTheme(theme));
  try {
    const ownerId = state.user?.user?.id;
    if (!ownerId) {
      return;
    }
    await ThemeService.postTheme({ ownerId, theme });
  } catch (error) {
    console.error(error);
  }
};

export const fetchTheme = (ownerId: number) => async (dispatch: Dispatch) => {
  try {
    if (!ownerId) {
      return;
    }
    const { theme } = await ThemeService.getTheme({ ownerId });
    dispatch(setUserTheme(theme));
  } catch (error) {
    console.error(error);
  }
};

export const fetchUser = () => async (dispatch: Dispatch) => {
  try {
    dispatch(loadPending());
    const data = await AuthService.getUser();
    dispatch(fetchTheme(data.id) as any);
    dispatch(loadSuccess(data));
  } catch (error) {
    dispatch(loadFailed());
  }
};
