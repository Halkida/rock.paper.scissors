import { FC } from 'react'
import { Navigate } from 'react-router-dom';
import urls from '@/utils/urls';

const withAuth = <P extends object>(Component: React.ComponentType<P>): FC => (
  (props: P) => {
    const isAuthenticated = true;
    return isAuthenticated
      ? <Component {...props} />
      : <Navigate to={urls.SIGN_IN} />;
  }
);

export default withAuth;