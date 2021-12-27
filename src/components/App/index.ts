import withAuthCheck from '@/hocs/with-auth-check';
import withOAuthCheck from '@/hocs/with-oauth-check';
import { App } from './App';

export default withOAuthCheck(
  withAuthCheck(App)
);
