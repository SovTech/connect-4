import * as React from 'react';
import * as renderer from 'react-test-renderer';
import ErrorMessage from '../index';

it('renders a ErrorMessage correctly', () => {
  const tree = renderer
    .create(<ErrorMessage />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
