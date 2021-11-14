import { Component } from 'react';
import SignIn from '@/pages/SignIn';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from '@/pages/SignUp';

class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/sign-in" element={ <SignIn /> } />
          <Route path="/sign-up" element={ <SignUp /> } />
        </Routes>
      </Router>
    );
  }
}
export default App;