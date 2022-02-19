import { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import yandexIcon from '@/assets/yandex-icon.png';
import { Input } from '@/components/Input';
import { Form, useForm } from '@/components/Form';
import { Notification } from '@/components/Notification';
import authServise from '@/services/auth';
import { PATTERNS } from '@/utils/formValidation';
import oAuthService from '@/services/oAuth';
import styles from'./SignIn.module.scss';

const validationConfig = {
  login: {
    pattern: {
      value: PATTERNS.LOGIN,
      message: 'Неверный ввод',
    },
  },
  password: {
    pattern: {
      value: PATTERNS.PASSWORD,
      message: 'Неверный ввод',
    }
  }
};

type SignInForm = {
  login: string;
  password: string
}

export const SignIn: FC = function SignInPage() {
  const navigate = useNavigate();
  const [notification, setNotification] = useState('');

  const onSubmit = async (data: Record<string, unknown>) => {
    try {
      await authServise.signIn(data);
      navigate('/profile');
    } catch(error) {
      setNotification(error.message);
    }
  };

  const { handleChange, handleSubmit, errors} = useForm<SignInForm>({validationConfig, onSubmit});
  const { login: loginError, password: passwordError } = (errors as any);

  const handleYandexClick = async () => {
    try {
      const data = await oAuthService.getServiceId();
      document.location.href = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${data.service_id}&redirect_uri=${window.location.origin}`;
    } catch (error) {
      setNotification(error.message);
    }
  };

  return (
    <main className={ styles.signin }>
      {notification && <Notification>{notification}</Notification>}
      <Form
        title='Вход'
        onSubmit={handleSubmit}
        submitText='Войти'
        renderFields={ () => (
          <>
            <Input onChange={ handleChange('login') }
              name='login'
              placeholder='Логин для входа'
              isValid={!loginError}
              errorText={loginError}
            />
            <Input onChange={ handleChange('password') }
              name='password'
              type='password'
              placeholder='Пароль'
              isValid={!passwordError}
              errorText={passwordError}
            />
          </>
        ) }
      />
      <Link className="link" to="/sign-up" >Зарегистрироваться</Link>
      <div className={styles.oAuths}>
        <div className={styles.oAuths_title}>
          Войти с помощью:
        </div>
        <ul className={styles.oAuths_list}>
          <li className={styles.oAuths_item}>
            <button
              type="button"
              className={styles.oAuths_button}
              style={{
                backgroundImage: `url(${yandexIcon})`,
              }}
              onClick={handleYandexClick}
            />
          </li>
        </ul>
      </div>
    </main>
  );
};