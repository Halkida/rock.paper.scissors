import { render, fireEvent } from '@testing-library/react';
import * as renderer from 'react-test-renderer';
import { Input } from '../';

const propsToTest = {
  isValid: [true, false],
  errorText: ['Some error text', ''],
  type: ['number', 'text', 'password']
};

describe('Input component testing', () => {
  test('Input props', () => {
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

  test('Input change event', () => {
    const onChange = jest.fn();
    const { getByPlaceholderText } = render(
      <Input onChange={onChange} placeholder='testing events' />
    );
    fireEvent.change(getByPlaceholderText('testing events'), {
      target: {value: 'test'}
    });

    expect(onChange).toHaveBeenCalledWith('test');
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});