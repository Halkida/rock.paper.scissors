import { useSelector } from 'react-redux';
import { useRoutes } from 'react-router-dom';
import cx from 'classnames';
import { routes } from '@/routes/routes';
import { selectUserTheme } from '@/store/user/selectors';
import styles from './App.module.scss';

export const App = () => {
  const element = useRoutes(routes);
  const theme = useSelector(selectUserTheme);

  return (
    <div className={cx([styles.container, theme])}>
      {element}
    </div>
  );
};
