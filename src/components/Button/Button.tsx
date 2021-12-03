import { ReactNode, FC, ButtonHTMLAttributes } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from'./Button.module.scss';

type OwnProps = {
  className?: string,
  viewType?: 'success' | 'danger' | 'default';
  view?: 'outline' | 'default' | 'link' | 'text';
  size?: 'small' | 'medium' | 'large';
  href?: string;
  children: ReactNode | string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

type Props = FC<OwnProps>;

const cx = classNames.bind(styles);

export const Button: Props = function(
  { children,
    viewType = 'default',
    view = 'default',
    size = 'medium',
    href = '',
    className = '',
    ...ButtonHTMLAttributes }
  ) {

  const buttonClassNames = cx({
    [className]: true,
    ['button']: true,
    [`button_${viewType}`]: viewType,
    [`button_${view}`]: view,
    [`button_${size}`]: size,
    ['button_link']: href.length
  });

  if (href.length > 0) {
    return (
      <Link to={href} className={buttonClassNames} >{children}</Link>
    );
  } else {
    return (
      <button
        className={buttonClassNames}
        { ...ButtonHTMLAttributes }
      >
        {children}
      </button>
    );
  }
};