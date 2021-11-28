import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRoutes } from 'react-router-dom';
import { routes } from '@/routes/routes';
import { fetchUser } from '@/store/user/actions';


export default function App() {
  const element = useRoutes(routes);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  }, [fetchUser]);

  return (
    element
  );
}
