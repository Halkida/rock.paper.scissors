import { FC, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input, InputProps } from '@/components/Input';
import { Form, useForm, FieldError } from '@/components/Form';
import { Notification } from '@/components/Notification';
import authServise from '@/services/auth';

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
        return Boolean(data.password && data.password === value);

      },
      message: 'Пароли не совпадают',
    },
  }
};

type SignUpForm = {
  email: string;
  first_name: string;
  second_name: string;
  phone: string;
  login: string;
  password: string;
  confirmPassword: string;
}

export const SignUp: FC = function SignUpPage() {
  const navigate = useNavigate();
  const [notification, setNotification] = useState('');

  const onSubmit = (data: Record<string, unknown>) => {
    authServise.signUp(data)
      .then(() => navigate('/profile'))
      .catch((error: Error) => {
        setNotification(error.message);
      });
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
  } = errors as FieldError;


  const formFieldsConfig: InputProps[] = [{
    onChange: useCallback(handleChange('email'), []),
    name: 'email',
    type: 'text',
    placeholder: 'Почта',
    isValid: !emailError,
    errorText: emailError
  }, {
    onChange: useCallback(handleChange('login'), []),
    name: 'login',
    type: 'text',
    placeholder: 'Логин для входа',
    isValid: !loginError,
    errorText: loginError
  }, {
    onChange: useCallback(handleChange('first_name'), []),
    name: 'first_name',
    type: 'text',
    placeholder: 'Имя',
    isValid: !nameError,
    errorText: nameError
  }, {
    onChange: useCallback(handleChange('second_name'), []),
    name: 'second_name',
    type: 'text',
    placeholder: 'Фамилия',
    isValid: !secondNameError,
    errorText: secondNameError
  }, {
    onChange: useCallback(handleChange('phone'), []),
    name: 'phone',
    type: 'text',
    placeholder: 'Телефон',
    isValid: !phoneError,
    errorText: phoneError
  }, {
    onChange: useCallback(handleChange('password'), []),
    name: 'password',
    type: 'password',
    placeholder: 'Пароль',
    isValid: !passwordError,
    errorText: passwordError
  }, {
    onChange: useCallback(handleChange('confirmPassword'), []),
    name: 'confirmPassword',
    type: 'password',
    placeholder: 'Пароль еще раз',
    isValid: !confirmPasswordError,
    errorText: confirmPasswordError
  }];

  return (
    <main className={ styles.signup }>
      { notification && <Notification>{notification}</Notification> }
      <Form
        title='Вход'
        onSubmit={handleSubmit}
        submitText='Зарегистрироваться'
        renderFields={ () => (
          <>
            { formFieldsConfig.map((field) => <Input key={field.name} {...field} />) }
          </>
        ) }
      />
      <Link className='link' to="/sign-in">Войти</Link>
    </main>
  );
};