import { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from '@/pages/SignIn';
import GameStart from '@/pages/GameStart';
import UsersRating from '@/pages/UsersRating';

class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/sign-in" element={ <SignIn /> } />
          <Route path="/game" element={ <GameStart /> } />
          <Route path="/users-rating" element={ <UsersRating /> } />
        </Routes>
      </Router>
    );
  }
}
export default App;