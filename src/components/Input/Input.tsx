import { FC, InputHTMLAttributes, ChangeEvent, useCallback } from 'react';
import classNames from 'classnames/bind';
import styles from'./Input.module.scss';

type OwnProps = {
  isValid?: boolean;
  errorText?: string;
  type?: 'number' | 'text' | 'password' | 'file',
  onChange?: (value: string) => void
  value?: string | undefined
};

type ReactInputAttributes = InputHTMLAttributes<HTMLInputElement>;
export type InputProps = OwnProps & Omit<ReactInputAttributes, keyof OwnProps>
type Props = FC<InputProps>;

const cx = classNames.bind(styles);

export const Input: Props = function Input(
  { isValid = true,
    errorText = '',
    type = 'text',
    onChange,
    value,
    ...InputHTMLAttributes }
  ) {

  const className = cx({
    ['input']: true,
    ['input_invalid']: !isValid
  });

  const changeHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (onChange) {
      onChange(value);
    }
  }, [value]);

  return (
    <>
      <input
        onChange={ changeHandler }
        type={type}
        value={value}
        className={className}
        { ...InputHTMLAttributes } />
      {
        !isValid && errorText &&
        <span className={styles['error-text']} >{ errorText }</span>
      }
    </>
  );
};
