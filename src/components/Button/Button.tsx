import { FC, ButtonHTMLAttributes } from 'react';
import { Link } from 'react-router-dom';
import styles from'./Button.scss';

type OwnProps = {
  view?: 'outline' | 'default' | 'link' | 'text';
  size?: 'small' | 'medium' | 'large';
  href?: string;
  children: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

type Props = FC<OwnProps>;

console.log(styles);

export const Button: Props = (
  { children,
    view = 'default',
    size = 'medium',
    href = '',
    ...ButtonHTMLAttributes }
  ) => {

  const modifiers = [view, size].map((item) => {
    const modifier = `button_${item}`;
    return styles[modifier] ? styles[modifier] : '';
  });

  if (href.length > 0) {
    return (
      <Link to={href} className={styles.link}>{children}</Link>
    );
  } else {
    return (
      <button
        className={ `${styles.button} ${modifiers.join(' ')}` }
        { ...ButtonHTMLAttributes }
      >
        {children}
      </button>
    );
  }
};