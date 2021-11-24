import { createStore } from 'redux';
import { IState } from '@/types';
import reducer from './reducers';

export function configureStore(initialState: IState) {
  const store = createStore(reducer, initialState);
  return store;
}