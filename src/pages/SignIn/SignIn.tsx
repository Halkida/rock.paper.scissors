import { FC } from 'react';
import { Input } from '@/components/Input';
import { Form, useForm } from '@/components/Form';
import { PATTERNS } from '@/utils/formValidation';
import { Link } from 'react-router-dom';
import styles from'./SignIn.module.scss';

const validationConfig = {
  login: {
    pattern: {
      value: PATTERNS.LOGIN,
      message: 'Incorrect login',
    },
  },
  password: {
    pattern: {
      value: PATTERNS.PASSWORD,
      message: 'Incorrect password',
    }
  }
};

type SignInForm = {
  login: string;
  password: string
}

export const SignIn: FC = () => {
  const onSubmit = (data: Record<string, unknown>) => {
    console.log(data);
  };
  const { handleChange, handleSubmit, errors} = useForm<SignInForm>({validationConfig, onSubmit});
  const { login: loginError, password: passwordError } = (errors as any);

  return (
    <main className={ styles.signin }>
      <Form
        title={ 'Sign In' }
        onSubmit={ handleSubmit }
        renderFields={ () => (
          <>
            <Input onChange={ handleChange('login') }
              name={'login'}
              placeholder='Login'
              isValid={ loginError ? false : true }
              errorText={ loginError ? loginError : undefined }
            />
            <Input onChange={ handleChange('password') }
              name={'password'}
              type={'password'}
              placeholder='Password'
              isValid={ passwordError ? false : true }
              errorText={ passwordError ? passwordError : undefined }
            />
          </>
        ) }
      />
      <Link className={ 'link' } to="/signup" >Sign Up</Link>
    </main>
  );
};