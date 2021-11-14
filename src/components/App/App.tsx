import { FC, useState, useEffect } from 'react';
import RPS from '@/RPS';
import Gamer from '@/RPS/Gamer';
import SignIn from '@/pages/SignIn';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App: FC = function App() {
  const [game, setGame] = useState<RPS | null>(null);

  useEffect(() => {
    const gamers = [new Gamer({ id: 2 }), new Gamer({ id: 1 })];
    setGame(new RPS({ gamers }));
  }, []);
  console.log(game);
  return (
    <Router>
      <Routes>
        <Route path="/sign-in" element={ <SignIn /> } />
      </Routes>
    </Router>
  );
};

export default App;