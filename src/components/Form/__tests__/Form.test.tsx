import { render, fireEvent } from '@testing-library/react';
import * as renderer from 'react-test-renderer';
import { Form } from '@/components/Form';
import { Input } from '@/components/Input';

describe('Form component testing', () => {
  const loginValue = 'login';
  const passwordValue = 'pass';
  const formFields = (
    <>
      <Input
        value={loginValue}
        name='login'
        placeholder='Login placeholder'
        isValid={true}
      />
      <Input
        value={passwordValue}
        name='password'
        placeholder='Password placeholder'
        isValid={true}
      />
    </>
  );

  test('Form snapshot test', () => {
    const component = renderer.create(
      <Form
        onSubmit={() => {}}
        title='Test form'
        submitText='Submit text'
        renderFields={() => formFields}
      />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Form submit test', () => {
    const onSubmit = jest.fn(e => e.preventDefault());
    const { getByText } = render(
      <Form
        onSubmit={onSubmit}
        title='Test form'
        submitText='Submit button text'
        renderFields={() => formFields}
      />
    );
    const submitButton = getByText('Submit button text');
    fireEvent.click(submitButton);

    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});