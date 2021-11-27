import { createSelector } from 'reselect';
import { IState } from '@/types';

export const selectUser = (state: IState) => state.user.user;
export const selectIsUserAuthorized = createSelector(
  selectUser,
  (user) => Boolean(user),
);
