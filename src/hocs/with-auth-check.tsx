import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '@/components/Spinner';
import { fetchUser } from '@/store/user/actions';
import { selectUserFetchingStatus } from '@/store/user/selectors';


const withAuthCheck = <P extends object>(Component: React.ComponentType<P>): FC => (
  function WithAuthCheck(props: P) {
    const dispatch = useDispatch();
    const status = useSelector(selectUserFetchingStatus);
    useEffect(() => {
      dispatch(fetchUser());
    }, [fetchUser, dispatch]);
    return status === 'pending' ?
      <Spinner /> :
      <Component {...props} />;
  }
);

export default withAuthCheck;