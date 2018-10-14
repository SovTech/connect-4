import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import { MemoryRouter } from 'react-router-dom';
import * as renderer from 'react-test-renderer';
import { FINISHED_GAME, NOT_STARTED_GAME } from '../../constants/dummy_content';
import { ALL_GAMES } from '../../graphql/queries';
import { mock } from '../../testing/graphql';
import Dashboard from './index';

const App = () => (
  <ApolloProvider client={mock.client as any}>
    <MemoryRouter>
      <Dashboard />
    </MemoryRouter>
  </ApolloProvider>
);

describe('Dashboard', () => {
  beforeEach(() => mock.reset());

  it('renders the Dashboard', () => {
    mock.expect(ALL_GAMES).reply({
      allGames: [FINISHED_GAME, NOT_STARTED_GAME]
    });

    const tree = renderer.create(App()).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders loading state', () => {
    mock.expect(ALL_GAMES).loading(true);

    const tree = renderer.create(App()).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders errors when API fails', () => {
    mock.expect(ALL_GAMES).fail('everything is terrible');

    const tree = renderer.create(App()).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
