import { Button } from '../';
import * as renderer from 'react-test-renderer';

test('Button', () => {
  const component = renderer.create(
    <Button>Button</Button>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});