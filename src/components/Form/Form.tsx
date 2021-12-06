import { FC, FormEvent } from 'react';
import classNames from 'classnames/bind';
import { Button } from '@/components/Button';
import styles from'./Form.module.scss';

type OwnFormProps = {
  className?: string,
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  renderFields: () => JSX.Element,
  submitText?: string
  title?: string
};
type FormProps = FC<OwnFormProps>;

const cx = classNames.bind(styles);

export const Form: FormProps = function Form(
  { onSubmit,
    renderFields,
    title,
    submitText = 'Отправить',
    className = '',
  }) {
  const formClassNames = cx({
    [className]: true,
    ['form']: true,
  })
  return (
    <div className={ formClassNames }>
      { title &&
        <span className={ styles.form__title }>
          {title}
        </span>
      }
      <form onSubmit={onSubmit} action='' className={styles.form__body}>
        { renderFields() }
        <Button type='submit' size='small'>{submitText}</Button>
      </form>
    </div>
  );
};