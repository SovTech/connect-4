import * as React from 'react';
import SingleGame from './index';
import { mock } from '../../testing/graphql';
import { ApolloProvider } from 'react-apollo';
import * as renderer from 'react-test-renderer';
import { LATEST_ROOM_STATUS, SINGLE_GAME } from '../../graphql/queries';
import { MemoryRouter } from 'react-router-dom';
import { FINISHED_GAME } from '../../constants/dummy_content';

const App = () => (
  <ApolloProvider client={mock.client as any}>
    <MemoryRouter>
      <SingleGame
        {...this.props}
        match={{params: {id: ''}}}
      />
    </MemoryRouter>
  </ApolloProvider>
);

describe('SingleGame', () => {
  beforeEach(() => mock.reset());

  it('renders the SingleGame', () => {
    mock.expect(LATEST_ROOM_STATUS);
    mock.expect(SINGLE_GAME).reply({
      Game: FINISHED_GAME
    });

    const tree = renderer.create(App()).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders loading state', () => {
    mock.expect(LATEST_ROOM_STATUS);
    mock.expect(SINGLE_GAME).loading(true);

    const tree = renderer.create(App()).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders errors when API fails', () => {
    mock.expect(LATEST_ROOM_STATUS);
    mock.expect(SINGLE_GAME).fail('everything is terrible');

    const tree = renderer.create(App()).toJSON();
    expect(tree).toMatchSnapshot();
  });
});