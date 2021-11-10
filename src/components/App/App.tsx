import { Component } from 'react';
import { SignIn } from '@/pages/SignIn';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/signin" element={ <SignIn /> } />
        </Routes>
      </Router>
    );
  }
}
export default App;