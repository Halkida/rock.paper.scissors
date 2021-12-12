import { FC, useCallback } from 'react';
import cx from 'classnames';
import { Form, useForm, FieldError } from '@/components/Form';
import { Input, InputProps } from '@/components/Input';
import { Button } from '@/components/Button';
import userServise from '@/services/user';
import { PATTERNS } from '@/utils/formValidation';
import styles from'./UserFormPassword.module.scss';

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

type OwnProps = {
  isEdit: boolean;
  onEdit: () => void;
  getNotification: (notification: string) => void
};


const userFormData: FC<OwnProps> = ({ isEdit, onEdit, getNotification }) => {
  const changeData = () => {
    onEdit();
  };

  const onSubmit = (data: Record<string, string>) => {
    userServise.changePassword({
      oldPassword: data.oldPassword,
      newPassword: data.password,
    })
      .then(() => changeData())
      .catch((error: Error) => {
        console.error(error.message);
        getNotification(error.message);
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
      styles.userFormPassword,
      { [styles.isEdit]: isEdit },
    ])}>
      <Form
        className={styles.userForm}
        onSubmit={handleSubmit}
        renderFields={ () => (
          <>
            <div className={styles.userFormData__inputsWrapper}>
              { formUserDataConfig.map((field) =>
                  <p
                    className={styles.input_wrapper}
                    key={field.name}
                  >
                    <label className={styles.input_name} htmlFor={field.id}>{field.placeholder}</label>
                    <Input key={field.name} {...field} />
                  </p>) }
            </div>
            <div className={styles.userFormPassword__buttonsWrapper}>
              <Button
                viewType="success"
                type="submit"
                className={styles.userFormPassword__buttonSubmit}
              >
                Сохранить
              </Button>
              <Button
                viewType="danger"
                type="button"
                onClick={changeData}
                className={styles.userFormPassword__buttonCancel}
              >
                Отменить
              </Button>
            </div>
          </>
        ) }
      />
    </div>
  );
};

export default userFormData;
