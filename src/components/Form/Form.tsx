import { FC, useState, FormEvent } from 'react';
import { Button } from '@/components/Button';
import styles from'./Form.module.scss';

type OwnFormProps = {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  renderFields: () => JSX.Element,
  title?: string
};
type FormProps = FC<OwnFormProps>;

export const Form: FormProps = ({onSubmit, renderFields, title}) => {

  return (
    <div className={ styles.form }>
      { title &&
        <span className={ styles.form__title }>
          {title}
        </span>
      }
      <form onSubmit={ onSubmit } action='' className={ styles.form__body }>
        { renderFields() }
        <Button type='submit' size={ 'small' }>Submit</Button>
      </form>
    </div>
  );
};

export const useForm = (options: any) => {
  const [data, setData] = useState(options?.initialValues || {});

  const handleChange = (key: string) => (value: string) => {
    setData((prevData: any) => {
      return { ...prevData, [key]: value };
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('submit', data);
  };

  return {
    data,
    handleChange,
    handleSubmit
  };
};