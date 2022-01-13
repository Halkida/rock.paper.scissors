import { FC, ReactNode } from 'react';
import logoImage from '@/assets/logo.jpg';
import { Link } from 'react-router-dom';

type OwnProps = {
  children: ReactNode | string,
};

export const Header: FC<OwnProps> = ({
  children,
}) => {
  return (
    <div>
      <Link
        to="/"
      >
        <img
          src={logoImage}
        />
      </Link>
      {children}
    </div>
  );
};
