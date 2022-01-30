import { FC, TextareaHTMLAttributes, ChangeEvent, useCallback } from 'react';
import cx from 'classnames/';
import styles from'./TextArea.module.scss';

type OwnProps = {
  isValid?: boolean;
  errorText?: string;
  onChange?: (value: string) => void
  value?: string | undefined,
  className?: string,
};

type ReactTextAreaAttributes = TextareaHTMLAttributes<HTMLTextAreaElement>;
export type TextAreaProps = OwnProps & Omit<ReactTextAreaAttributes, keyof OwnProps>
type Props = FC<TextAreaProps>;

export const TextArea: Props = (
  { isValid = true,
    errorText = '',
    onChange,
    value,
    className = '',
    ...TextareaHTMLAttributes }
  ) => {

  const changeHandler = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    if (onChange) {
      onChange(value);
    }
  }, [value]);

  return (
    <>
      <textarea
        onChange={ changeHandler }
        value={value}
        className={cx([{
          [styles.textarea]: true,
          [styles.textarea_invalid]: !isValid,
          [className]: true,
        }])}
        { ...TextareaHTMLAttributes } />
      {
        !isValid && errorText &&
        <span className={styles['error-text']} >{ errorText }</span>
      }
    </>
  );
};
