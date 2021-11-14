import { ReactNode, FC, ButtonHTMLAttributes } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from'./Button.module.scss';

type OwnProps = {
  view?: 'outline' | 'default' | 'link' | 'text';
  size?: 'small' | 'medium' | 'large';
  href?: string;
  children: ReactNode | string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

type Props = FC<OwnProps>;

const cx = classNames.bind(styles);

export const Button: Props = function(
  { children,
    view = 'default',
    size = 'medium',
    href = '',
    ...ButtonHTMLAttributes }
  ) {

  const className = cx({
    ['button']: true,
    [`button_${view}`]: view,
    [`button_${size}`]: size,
    ['button_link']: href.length
  });

  if (href.length > 0) {
    return (
      <Link to={href} className={className} >{children}</Link>
    );
  } else {
    return (
      <button
        className={className}
        { ...ButtonHTMLAttributes }
      >
        {children}
      </button>
    );
  }
};