import { useRoutes } from 'react-router-dom';
import { routes } from '@/routes/routes';

export default function App() {
  let element = useRoutes(routes);

  return (
    <div>
      {element}
    </div>
  );
}
