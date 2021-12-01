import { FC, useState, useCallback } from 'react';
import cx from 'classnames';
import { Form, useForm, FieldError } from '@/components/Form';
import { Input, InputProps } from '@/components/Input';
import { Button } from '@/components/Button';
import userServise from '@/services/user';
import { PATTERNS } from '@/utils/formValidation';
import styles from'./Profile.module.scss';

const validationConfig = {
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

type PasswordForm = {
  oldPassword: string;
  password: string;
  confirmPassword: string;
}

const userFormData: FC = () => {
  const [isEdit, setIsEdit] = useState(false);

  const changeData = () => {
    setIsEdit(!isEdit);
  }
  
  const onSubmit = (data: Record<string, string>) => {
    userServise.changePasswodr({
      oldPassword: data.oldPassword,
      newPassword: data.password,
    })
      .then(() => changeData())
      .catch((error: Error) => {
        console.log(error.message);
      });
  };

  const { handleChange, handleSubmit, errors} = useForm<PasswordForm>({validationConfig, onSubmit});
  
  const {
    password: passwordError,
    confirmPassword: confirmPasswordError,
  } = errors as FieldError;


  const formUserDataConfig: InputProps[] = [
    {
      onChange: useCallback(handleChange('oldPassword'), []),
      name: 'oldPassword',
      type: 'password',
      placeholder: 'Старый пароль',
      isValid: !passwordError,
      errorText: passwordError,
    },
    {
      onChange: useCallback(handleChange('password'), []),
      name: 'newPassword',
      type: 'password',
      placeholder: 'Новый пароль',
      isValid: !passwordError,
      errorText: passwordError,
    },
    {
      onChange: useCallback(handleChange('confirmPassword'), []),
      name: 'confirmPassword',
      type: 'password',
      placeholder: 'Новый пароль еще раз',
      isValid: !confirmPasswordError,
      errorText: confirmPasswordError,
    },
  ];

  return (
    <div className={cx([
      styles.container,
      styles.passwordSection,
      { [styles.isEdit]: isEdit },
    ])}>
      <Form
        onSubmit={handleSubmit}
        renderFields={ () => (
          <>
            { formUserDataConfig.map((field) => 
              <>
                <p
                  className={styles.input_wrapper}
                  key={field.name}
                >
                  <label className={styles.input_name} htmlFor={field.id}>{field.placeholder}</label>
                  <Input key={field.name} {...field} />
                </p>
              </>
            ) }
            <div className={styles.profilePage__buttonsWrapper}>
              <Button
                type="submit"
                className={styles.profilePage__buttonSubmit}
              >
                Сохранить
              </Button>
              <Button
                type="button"
                onClick={changeData}
                className={styles.profilePage__buttonCancel}
              >
                Отменить
              </Button>
            </div>
          </>
        ) }
      />
      <Button
        type="button"
        onClick={changeData}
        className={styles.profilePage__buttonChange}
      >
        Изменить пароль
      </Button>
    </div>
  );
};

export default userFormData;
