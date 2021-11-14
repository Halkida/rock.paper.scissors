import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/Input';
import { Form, useForm } from '@/components/Form';
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
  const onSubmit = (data: Record<string, unknown>) => {
    console.log('Здесь должна быть ваша авторизация ', data);
  };
  const { handleChange, handleSubmit, errors} = useForm<SignInForm>({validationConfig, onSubmit});
  const { login: loginError, password: passwordError } = (errors as any);

  return (
    <main className={ styles.signin }>
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
      <Link className={ 'link' } to="/sign-up" >Зарегистрироваться</Link>
    </main>
  );
};