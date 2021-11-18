import { FC, ImgHTMLAttributes } from 'react';
import cx from 'classnames';
import styles from './Image.module.scss';

type OwnProps = {
  className?: string;
  isRound?: boolean;
} & ImgHTMLAttributes<HTMLImageElement>;

type Props = FC<OwnProps>;


export const Image: Props = (
  { className = '',
    isRound = false,
    ...ImgHTMLAttributes }
  ) => {
  return (
    <img
      className={cx([
        styles.image,
        { [styles.image__round]: isRound },
        className
      ])}
      {...ImgHTMLAttributes}
    />
  );
};