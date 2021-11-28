import { Button } from '../';
import * as renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';


describe('Button component testing', () => {
  test('Button', () => {
    const component = renderer.create(
      <Button>Button</Button>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Link', () => {
    const component = renderer.create(
      <MemoryRouter>
        <Button href='https://ya.ru/'>Link</Button>
      </MemoryRouter>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});