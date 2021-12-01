import { FC, Fragment } from 'react';
import { useSelector } from 'react-redux';
import urls from '@/utils/urls';
import { Button } from '@/components/Button';
import { selectIsUserAuthorized } from '@/store/user/selectors';
import styles from './Home.module.scss';

export const Home: FC = () => {
  const isUserAuthorized = useSelector(selectIsUserAuthorized);

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Камень. Ножницы. Бумага.</h1>
      <div className={styles.imageWrapper}>
        <img
          className={styles.image}
          src="/images/rpc.png"
        />
      </div>
      <div className={styles.buttons}>
        {!isUserAuthorized ? (
          <Fragment>
            <Button
              href={urls.SIGN_IN}
              className={styles.button}
            >
              Авторизация
            </Button>
            <Button
              href={urls.SIGN_UP}
              className={styles.button}
            >
              Регистрация
            </Button>
          </Fragment>
        ) : (
          <Button
            href={urls.GAME}
            className={styles.button}
          >
            К игре
          </Button>
        )}
      </div>
    </div>
  );
};