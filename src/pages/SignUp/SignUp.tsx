import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/Input';
import { Form, useForm } from '@/components/Form';
import { PATTERNS } from '@/utils/formValidation';
import styles from'./SignUp.module.scss';

const validationConfig = {
  email: {
    pattern: {
      value: PATTERNS.EMAIL,
      message: 'Неверный ввод',
    },
  },
  first_name: {
    pattern: {
      value: PATTERNS.DEFAULT,
      message: 'Неверный ввод',
    },
  },
  second_name: {
    pattern: {
      value: PATTERNS.DEFAULT,
      message: 'Неверный ввод',
    },
  },
  phone: {
    pattern: {
      value: PATTERNS.PHONE,
      message: 'Неверный ввод',
    },
  },
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
  },
  confirmPassword: {
    custom: {
      isValid: (value: string, data: Record<string, unknown>) => {
        return data.password && data.password === value;
      },
      message: 'Пароли не совпадают',
    },
  }
};

type SignUpForm = {
  login: string;
  password: string
}

export const SignUp: FC = function SignUpPage() {
  const onSubmit = (data: Record<string, unknown>) => {
    console.log('Здесь должна быть ваша регистрация ', data);
  };
  const { handleChange, handleSubmit, errors} = useForm<SignUpForm>({validationConfig, onSubmit});
  const {
    email: emailError,
    first_name: nameError,
    second_name: secondNameError,
    phone: phoneError,
    login: loginError,
    password: passwordError,
    confirmPassword: confirmPasswordError
  } = (errors as any);

  return (
    <main className={ styles.signup }>
      <Form
        title='Вход'
        onSubmit={handleSubmit}
        submitText='Зарегистрироваться'
        renderFields={ () => (
          <>
            <Input onChange={ handleChange('email') }
              name='email'
              placeholder='Почта'
              isValid={!emailError}
              errorText={emailError}
            />
            <Input onChange={ handleChange('login') }
              name='login'
              placeholder='Логин для входа'
              isValid={!loginError}
              errorText={loginError}
            />
            <Input onChange={ handleChange('first_name') }
              name='first_name'
              placeholder='Имя'
              isValid={!nameError}
              errorText={nameError}
            />
            <Input onChange={ handleChange('second_name') }
              name='second_name'
              placeholder='Фамилия'
              isValid={!secondNameError}
              errorText={secondNameError}
            />
            <Input onChange={ handleChange('phone') }
              name='phone'
              placeholder='Телефон'
              isValid={!phoneError}
              errorText={phoneError}
            />

            <Input onChange={ handleChange('password') }
              name='password'
              type='password'
              placeholder='Пароль'
              isValid={!passwordError}
              errorText={passwordError}
            />
            <Input onChange={ handleChange('confirmPassword') }
              name='confirmPassword'
              type='password'
              placeholder='Пароль еще раз'
              isValid={!confirmPasswordError}
              errorText={confirmPasswordError}
            />
          </>
        ) }
      />
      <Link className={ 'link' } to="/sign-up" >Войти</Link>
    </main>
  );
};