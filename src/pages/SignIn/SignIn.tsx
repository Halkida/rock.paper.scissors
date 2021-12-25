import { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import yandexIcon from '@/assets/yandex-icon.png';
import { Input } from '@/components/Input';
import { Form, useForm } from '@/components/Form';
import { Notification } from '@/components/Notification';
import authServise from '@/services/auth';
import { PATTERNS } from '@/utils/formValidation';
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

  const onSubmit = (data: Record<string, unknown>) => {
    authServise.signIn(data)
      .then(() => navigate('/profile'))
      .catch((error: Error) => {
        setNotification(error.message);
      });
  };

  const { handleChange, handleSubmit, errors} = useForm<SignInForm>({validationConfig, onSubmit});
  const { login: loginError, password: passwordError } = (errors as any);

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
            />
          </li>
        </ul>
      </div>
    </main>
  );
};