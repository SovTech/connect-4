import * as React from 'react';
import * as renderer from 'react-test-renderer';
import Cell from '../index';

it('renders a Cell correctly', () => {
  const tree = renderer
    .create(<Cell cell='' />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
