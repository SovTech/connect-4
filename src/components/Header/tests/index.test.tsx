import * as React from 'react';
import * as renderer from 'react-test-renderer';
import Header from '../index';

it('renders Header correctly', () => {
  const tree = renderer
    .create(<Header />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
