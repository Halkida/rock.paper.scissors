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

export const routes: RouteObject[] = [
  {
    path: "/sign-in",
    element: <SignIn />,
    
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/game",
    element: <RequireAuth><Game /></RequireAuth>,
  },
  {
    path: "/leader-board",
    element: <LeaderBoard />,
  },
  {
    path: "/profile",
    element: <RequireAuth><Profile /></RequireAuth>,
  },
  {
    path: "/forum",
    element: <ForumIndex />,
    children: [
      { index: true,
        element: <Forum /> },
      {
      path: "/forum/:id",
      element: <Topic />,
    }]
  },
  {
    path: "*",
    element: <NoMatch />,
  },
]
