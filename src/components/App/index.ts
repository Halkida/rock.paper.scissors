import withAuthCheck from '@/hocs/with-auth-check';
import withOAuthCheck from '@/hocs/with-oauth-check';
import { compose } from 'redux';
import { App } from './App';

export default compose(
  withOAuthCheck,
  withAuthCheck,
)(App);
