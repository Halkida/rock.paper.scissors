import { hydrate } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@/store';
import ErrorBoundary from '@/components/ErrorBoundary';
import App from './components/App';
import { startServiceWorker } from './startServiceWorker';
import './styles/index.scss';

const initialState = window.__INITIAL_STATE__;
const store = configureStore(initialState);

// @ts-ignore
if (PRODUCTION) {
  startServiceWorker();
}

hydrate(
  <Router>
    <ErrorBoundary>
      <Provider store={store}>
        <App/>
      </Provider>
    </ErrorBoundary>
  </Router>,
  document.getElementById('root'),
);