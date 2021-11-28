import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '@/components/Input';
import { Form, useForm } from '@/components/Form';
import { Notification } from '@/components/Notification';
import authServise from '@/services/auth';
import { PATTERNS } from '@/utils/formValidation';
import { selectIsUserAuthorized } from '@/store/user/selectors';
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
  const isAuthorized = useSelector(selectIsUserAuthorized);
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
    isAuthorized ? (
      <h1>
        Вы авторизованы
      </h1>
    ) : (
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
      </main>
    )
  );
};