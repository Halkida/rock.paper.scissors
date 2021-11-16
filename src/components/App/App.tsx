import { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from '@/pages/SignIn';
import GameStart from '@/pages/GameStart';
import ErrorBoundary from '../ErrorBoundary';

class App extends Component {
  render() {
    return (
      <ErrorBoundary>
        <div>
          {
            <h1>
              {new Error()}
            </h1>
          }
          <Router>
            <Routes>
              <Route path="/sign-in" element={ <SignIn /> } />
              <Route path="/game" element={ <GameStart /> } />
            </Routes>
          </Router>
        </div>
      </ErrorBoundary>
    );
  }
}
export default App;