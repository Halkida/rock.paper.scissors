import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectIsUserAuthorized } from '@/store/user/selectors';
import urls from '@/utils/urls';

const withAuth = <P extends object>(Component: React.ComponentType<P>): FC => (
  function WithAuth(props: P) {
    const isUserAuthorized = useSelector(selectIsUserAuthorized);
    return isUserAuthorized ?
      <Component {...props} /> :
      <Navigate to={urls.SIGN_IN} />;
  }
);

export default withAuth;