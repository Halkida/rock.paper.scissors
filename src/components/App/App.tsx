import { Component } from 'react';
import SignIn from '@/pages/SignIn';
import GameStart from '@/pages/GameStart';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/sign-in" element={ <SignIn /> } />
          <Route path="/game" element={ <GameStart /> } />
        </Routes>
      </Router>
    );
  }
}
export default App;