import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import ErrorBoundary from '@/components/ErrorBoundary';
import App from './components/App/App';
import './styles/index.scss';

ReactDOM.render(
  <Router>
    <ErrorBoundary>
      <App/>
    </ErrorBoundary>
  </Router>,
  document.getElementById('root'),
);