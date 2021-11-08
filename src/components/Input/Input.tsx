import { FC, InputHTMLAttributes } from 'react';
import classNames from 'classnames/bind';
import styles from'./Input.module.scss';

type OwnProps = {
  isValid?: boolean;
  errorText?: string;
  type?: 'number' | 'text' | 'password'
} & InputHTMLAttributes<HTMLInputElement>;

type Props = FC<OwnProps>;

const cx = classNames.bind(styles);

export const Input: Props = (
  { isValid = true,
    errorText = '',
    type = 'text',
    ...InputHTMLAttributes }
  ) => {

  const className = cx({
    ['input']: true,
    ['input_invalid']: !isValid
  });

  return (
    <>
      <input type={type} className={className} { ...InputHTMLAttributes } />
      {
        (isValid === false && errorText.length > 0) &&
        <span className={styles['error-text']} >{ errorText }</span>
      }
    </>
  );
};
