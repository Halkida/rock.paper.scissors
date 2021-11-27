import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { IState } from '@/types';
import reducer from './reducers';

export function configureStore(initialState: IState) {
  const store = createStore(reducer, initialState, applyMiddleware(thunk));
  return store;
}