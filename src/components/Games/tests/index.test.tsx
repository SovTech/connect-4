import * as React from 'react';
import * as renderer from 'react-test-renderer';
import Games from '../index';

it('renders Games correctly', () => {
  const tree = renderer
    .create((
      <Games
        subscribeToNewGames={() => null}
        games={[]}
      />
    )).toJSON();
  expect(tree).toMatchSnapshot();
});
