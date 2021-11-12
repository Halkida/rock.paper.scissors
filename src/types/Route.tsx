import { ReactNode, ReactElement } from 'react';

export default interface Route {
  path: string,
  element: ReactElement | null;
  isPrivate: boolean,
  exact: boolean,
  children?: ReactNode,
}
