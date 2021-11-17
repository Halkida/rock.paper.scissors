import { FC } from 'react';
import { Outlet } from 'react-router-dom';

export const ForumIndex: FC = () => {
  return (
    <main>
      <Outlet />
    </main>
  );
};