import {
  ChangeEvent,
  ChangeEventHandler,
  FC,
  ReactNode,
  useCallback,
} from 'react';
import cx from 'classnames';
import styles from './SliderCheckbox.module.scss';

type OwnProps = {
  checked: boolean,
  value: string | number,
  disabled?: boolean,
  children?: ReactNode | string,
  className?: string,
  onChange: (value: boolean) => void,
};

export const SliderCheckbox: FC<OwnProps> = ({
  checked,
  value,
  disabled = false,
  children,
  className,
  onChange,
  ...props
}) => {
  const handleInputChange: ChangeEventHandler = useCallback(
    (e: ChangeEvent) => {
      const target = e.target as HTMLInputElement;
      onChange(target.checked);
    },
    [onChange]
  );

  return (
    <label
      className={cx([styles.label, className])}
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
