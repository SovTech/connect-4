import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { ErrorBoundary } from '../index';

it('renders a ErrorBoundary correctly', () => {
  const tree = renderer
    .create(<ErrorBoundary />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
