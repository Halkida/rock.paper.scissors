import { Input } from '../';
import * as renderer from 'react-test-renderer';

const propsToTest = {
  isValid: [true, false],
  errorText: ['Some error text', ''],
  type: ['number', 'text', 'password']
};

describe('Input component testing', () => {
  test('Input', () => {
    Object.entries(propsToTest).forEach(([prop, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => {
          const component = renderer.create(
            <Input {...{[prop]: item}}>Input</Input>
          );
          const tree = component.toJSON();
          expect(tree).toMatchSnapshot();
        });
      } else {
        const component = renderer.create(
          <Input {...{[prop]: value}}>Input</Input>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
      }
    });
  });
});