import { FC, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import oAuthService from '@/services/oAuth';
import Spinner from '@/components/Spinner';

const withOAuthCheck = <P extends object>(Component: React.ComponentType<P>): FC => (
  function WithOAuthCheck(props: P) {
    const [isFetching, setIsFetching] = useState(true);
    const [searchParams] = useSearchParams();
    const code = searchParams.get('code');

    useEffect(() => {
      const sendCode = async () => {
        if (code) {
          try {
            await oAuthService.sendCode(code);
          } catch (error) {
            console.error(error);
          }
        }
        setIsFetching(false);
      };
      sendCode();
    }, [code]);

    return (code && isFetching) ?
      <Spinner /> :
      <Component {...props} />;
  }
);

export default withOAuthCheck;