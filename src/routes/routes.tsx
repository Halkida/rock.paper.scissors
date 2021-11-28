import { RouteObject } from 'react-router-dom';
import SignIn from '@/pages/SignIn';
import SignUp from '@/pages/SignUp';
import Game from '@/pages/Game';
import LeaderBoard from '@/pages/LeaderBoard';
import Profile from '@/pages/Profile';
import Forum from '@/pages/Forum';
import NoMatch from '@/pages/NoMatch';
import Topic from '@/pages/Topic';
import ForumIndex from '@/pages/ForumIndex';
import RequireAuth from '@/components/RequireAuth';
import urls from '@/utils/urls';

export const routes: RouteObject[] = [
  {
    path: urls.HOME,
    element: <SignIn />,
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
    element: <RequireAuth><Game /></RequireAuth>,
  },
  {
    path: urls.USER_RATING,
    element: <LeaderBoard />,
  },
  {
    path: urls.PROFILE,
    element: <RequireAuth><Profile /></RequireAuth>,
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
