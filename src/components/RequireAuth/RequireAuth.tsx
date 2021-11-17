import { FC, ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

export const RequireAuth: FC = ({
  children,
}) => {
  // TODO сделать проверку идентификации
  // let isAuthenticated = getAuth();
  const isAuthenticated = true;
  return isAuthenticated ? children as ReactElement<any> : <Navigate to="/sign-in" />;
};
