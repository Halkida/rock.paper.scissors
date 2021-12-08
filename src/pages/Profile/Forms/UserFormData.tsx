import { FC, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cx from 'classnames';
import { IUser } from '@/types';
import { Form, useForm, FieldError } from '@/components/Form';
import { Input, InputProps } from '@/components/Input';
import { Button } from '@/components/Button';
import userServise from '@/services/user';
import { PATTERNS } from '@/utils/formValidation';
import styles from'./UserFormData.module.scss';
import { loadSuccess, loadPending } from '@/store/user/actions';
import { selectUser } from '@/store/user/selectors';

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
};

type ProfileForm = {
  email: string;
  first_name: string;
  second_name: string;
  phone: string;
  login: string;
}

type OwnProps = {
  isEdit: boolean;
  isEditPassword: boolean;
  onEdit: () => void;
  getNotification: (notification: string) => void
};

const userFormData: FC<OwnProps> = ({ isEdit, isEditPassword, onEdit, getNotification }) => {
  const dispatch = useDispatch();

  const user: Nullable<IUser> = useSelector(selectUser);

  const [data, setData] = useState(user as IUser);
  const [inputsData, setInputsData] = useState(user as IUser);
  // const [isEdit, setIsEdit] = useState(false);

  const onInputChange = (key: string) => (value: string) => {
    setInputsData((prevData: IUser) => {
      return { ...prevData, [key]: value };
    });
    handleChange(key)(value);
  };

  const onCancelData = () => {
    setInputsData(data);
    clearErrors();
    onEdit();
  }

  const onSubmit = () => {
    userServise.changeProfile({
      "first_name": inputsData.first_name,
      "second_name": inputsData.second_name,
      "display_name": inputsData.login,
      "login": inputsData.login,
      "email": inputsData.email,
      "phone": inputsData.phone,
    })
      .then((response) => {
        dispatch(loadPending())
        dispatch(loadSuccess(response as IUser));
      })
      .then(() => {
        setData(user as IUser);
        setInputsData(user as IUser);
      })
      .then(() => onEdit())
      .catch((error: Error) => {
        console.error(error.message);
        getNotification(error.message);
      });
  };

  const { handleChange, handleSubmit, errors, clearErrors} = useForm<ProfileForm>({validationConfig, initialValues: user, onSubmit});
  
  const {
    email: emailError,
    first_name: nameError,
    second_name: secondNameError,
    phone: phoneError,
    login: loginError,
  } = errors as FieldError;


  const formUserDataConfig: InputProps[] = [
    {
      onChange: useCallback(onInputChange('email'), []),
      name: 'email',
      type: 'text',
      placeholder: 'Почта',
      isValid: !emailError,
      id: 'email',
      errorText: emailError,
      value: inputsData?.email,
    },
    {
      onChange: useCallback(onInputChange('login'), []),
      name: 'login',
      type: 'text',
      placeholder: 'Логин для входа',
      isValid: !loginError,
      errorText: loginError,
      id: 'login',
      value: inputsData?.login,
    },
    {
      onChange: useCallback(onInputChange('first_name'), []),
      name: 'first_name',
      type: 'text',
      placeholder: 'Имя',
      isValid: !nameError,
      errorText: nameError,
      id: 'first_name',
      value: inputsData?.first_name,
    },
    {
      onChange: useCallback(onInputChange('second_name'), []),
      name: 'second_name',
      type: 'text',
      placeholder: 'Фамилия',
      isValid: !secondNameError,
      errorText: secondNameError,
      id: 'second_name',
      value: inputsData?.second_name,
    },
    {
      onChange: useCallback(onInputChange('phone'), []),
      name: 'phone',
      type: 'text',
      placeholder: 'Телефон',
      isValid: !phoneError,
      errorText: phoneError,
      id: 'phone',
      value: inputsData?.phone,
    },
  ];

  return (
    <div className={cx([
      styles.container,
      styles.userFormData,
      // { [styles.dataSection]: !isEditPassword },
      { [styles.isEdit]: isEdit },
      { [styles.isEditPasswordForm]: isEditPassword },
    ])}>
      <Form
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
                </p>
              ) }
            </div>
            { isEdit &&
              <div className={styles.userFormData__buttonsWrapper}>
                <Button
                  viewType="success"
                  type="submit"
                  className={styles.userFormData__buttonSubmit}
                >
                  Сохранить
                </Button>
                <Button
                  viewType="danger"
                  type="button"
                  onClick={onCancelData}
                  className={styles.userFormData__buttonCancel}
                >
                  Отменить
                </Button>
              </div>
            }
          </>
        ) }
      />
    </div>
  );
};

export default userFormData;
