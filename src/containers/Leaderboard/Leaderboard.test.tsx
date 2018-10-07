import * as React from 'react';
import Leaderboard from './index';
import { ApolloProvider } from 'react-apollo';
import { ALL_USERS } from '../../graphql/queries';
import * as renderer from 'react-test-renderer';
import { mock } from '../../testing/graphql';
import { PLAYER_100, PLAYER_101 } from '../../constants/dummy_content';

const App = () => (
  <ApolloProvider client={mock.client as any}>
    <Leaderboard/>
  </ApolloProvider>
);

describe('Leaderboard', () => {
  beforeEach(() => mock.reset());
  it('renders the leaderboard', () => {
    mock.expect(ALL_USERS).reply({
      allUsers: [PLAYER_100, PLAYER_101]
    });

    const tree = renderer.create(App()).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders loading state', () => {
    mock.expect(ALL_USERS).loading(true);

    const tree = renderer.create(App()).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders errors when API fails', () => {
    mock.expect(ALL_USERS).fail('everything is terrible');

    const tree = renderer.create(App()).toJSON();
    expect(tree).toMatchSnapshot();
  });
});