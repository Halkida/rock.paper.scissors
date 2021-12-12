import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore, getInitialState } from '@/store';
import ErrorBoundary from '@/components/ErrorBoundary';
import App from './components/App';
import './styles/index.scss';

const store = configureStore(getInitialState());

ReactDOM.hydrate(
  <Router>
    <ErrorBoundary>
      <Provider store={store}>
        <App/>
      </Provider>
    </ErrorBoundary>
  </Router>,
  document.getElementById('root'),
);