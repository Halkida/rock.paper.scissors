import { ChangeEvent, ChangeEventHandler, FC, ReactNode } from 'react';
import cx from 'classnames';
import styles from './SliderCheckbox.module.scss';

type OwnProps = {
  checked: boolean,
  value: string | number,
  disabled?: boolean,
  children?: ReactNode | string,
  onChange: (value: boolean) => void,
};

export const SliderCheckbox: FC<OwnProps> = ({
  checked,
  value,
  disabled = false,
  children,
  onChange,
  ...props
}) => {
  const handleInputChange: ChangeEventHandler = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    onChange(target.checked);
  };

  return (
    <label
      className={styles.label}
    >
      <input
        {...props}
        type="checkbox"
        value={value}
        disabled={disabled}
        checked={checked}
        className={cx(['visuallyHidden', styles.input])}
        onChange={handleInputChange}
      />
      <span className={styles.indicator} />
      {children}
    </label>
  );
};
