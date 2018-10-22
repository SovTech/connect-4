import * as React from 'react';
import * as renderer from 'react-test-renderer';
import Button from '../index';

describe('Button Component', () => {
  it('renders a Button correctly', () => {
    const tree = renderer
      .create(<Button text='Button Title' onClick={() => console.log('onClick')} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a disabled Button correctly', () => {
    const tree = renderer
      .create(<Button disabled={true} text='Button Title' onClick={() => console.log('onClick')} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a loading Button correctly', () => {
    const tree = renderer
      .create(<Button isLoading={true} text='Button Title' onClick={() => console.log('onClick')} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
