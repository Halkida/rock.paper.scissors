import React from 'react';
import urls from '@/utils/urls';

const withAuth = <P extends object>(Component: React.ComponentType<P>) => (
  (props: P) => {
    const isAuthenticated = true;
    return isAuthenticated
      ? <Component {...props} />
      : <Navigate to={urls.SIGN_IN} />;
  }
);

export default withAuth;