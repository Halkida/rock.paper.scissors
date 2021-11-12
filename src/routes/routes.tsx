import typesRoute from '@/types/Route';
import SignIn from '@/pages/SignIn';
import SignUp from '@/pages/SignUp';
import Game from '@/pages/Game';
import LeaderBoard from '@/pages/LeaderBoard';
import Profile from '@/pages/Profile';
import Forum from '@/pages/Forum';
import NoMatch from '@/pages/NoMatch';
// TODO
// import Topic from '@/pages/Topic';

export const routes: typesRoute[] = [
  {
    path: "/sign-in",
    element: <SignIn />,
    isPrivate: false,
    exact: true,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
    isPrivate: false,
    exact: true,
  },
  {
    path: "/game",
    element: <Game />,
    isPrivate: true,
    exact: true,
  },
  {
    path: "/leader-board",
    element: <LeaderBoard />,
    isPrivate: false,
    exact: true,
  },
  {
    path: "/profile",
    element: <Profile />,
    isPrivate: true,
    exact: true,
  },
  {
    path: "/forum",
    element: <Forum />,
    isPrivate: false,
    exact: true,
    // TODO
    // children: [{
    //   path: "/forum/:id",
    //   element: <Topic />,
    //   isPrivate: true,
    //   exact: true,
    // }]
  },
  {
    path: "*",
    element: <NoMatch />,
    isPrivate: false,
    exact: false,
  },
]
