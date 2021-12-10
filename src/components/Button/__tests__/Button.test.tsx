import { Button } from '@/components/Button';
import * as renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';

const propsToTest = {
  className: 'test-class',
  view: ['outline', 'default', 'link', 'text'],
  size: ['small', 'medium', 'large']
};

describe('Button component testing', () => {
  test('Button', () => {

    Object.entries(propsToTest).forEach(([prop, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => {
          const component = renderer.create(
            <Button {...{[prop]: item}}>Button</Button>
          );
          const tree = component.toJSON();
          expect(tree).toMatchSnapshot();
        });
      } else {
        const component = renderer.create(
          <Button {...{[prop]: value}}>Button</Button>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      }
    });
  });

  test('Link button', () => {
    const component = renderer.create(
      <MemoryRouter>
        <Button href='https://ya.ru/'>Link</Button>
      </MemoryRouter>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});