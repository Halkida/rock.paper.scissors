import { createSelector } from 'reselect';
import { IState } from '@/types';

export const selectUser = (state: IState) => state.user.user;
export const selectUserFetchingStatus = (state: IState) => state.user.status;
export const selectIsUserAuthorized = createSelector(
  selectUser,
  (user) => Boolean(user),
);
export const selectUserTheme = (state: IState) => state.user.theme;
