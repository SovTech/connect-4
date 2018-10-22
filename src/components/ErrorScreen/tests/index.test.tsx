import * as React from 'react';
import * as renderer from 'react-test-renderer';
import ErrorScreen from '../index';

it('renders a ErrorScreen correctly', () => {
  const tree = renderer
    .create(<ErrorScreen />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
