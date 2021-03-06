import { RouteObject } from 'react-router-dom';
import Home from '@/pages/Home';
import SignIn from '@/pages/SignIn';
import SignUp from '@/pages/SignUp';
import Game from '@/pages/Game';
import UserRating from "@/pages/UsersRating";
import Profile from '@/pages/Profile';
import Forum from '@/pages/Forum';
import NoMatch from '@/pages/NoMatch';
import Topic from '@/pages/Topic';
import ForumIndex from '@/pages/ForumIndex';
import urls from '@/utils/urls';

export const routes: RouteObject[] = [
  {
    path: urls.HOME,
    element: <Home />,
  },
  {
    path: urls.SIGN_IN,
    element: <SignIn />,
  },
  {
    path: urls.SIGN_UP,
    element: <SignUp />,
  },
  {
    path: urls.GAME,
    element: <Game />,
  },
  {
    path: urls.USER_RATING,
    element: <UserRating />,
  },
  {
    path: urls.PROFILE,
    element: <Profile />,
  },
  {
    path: urls.FORUM,
    element: <ForumIndex />,
    children: [
      {
        index: true,
        element: <Forum />,
      },
      {
        path: urls.TOPICK,
        element: <Topic />,
      },
    ],
  },
  {
    path: urls.NO_MATCH,
    element: <NoMatch />,
  },
];
