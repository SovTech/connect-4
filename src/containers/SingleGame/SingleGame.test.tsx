import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import { MemoryRouter } from 'react-router-dom';
import * as renderer from 'react-test-renderer';
import { FINISHED_GAME } from '../../constants/dummy_content';
import { SINGLE_GAME } from '../../graphql/queries';
import { mock } from '../../testing/graphql';
import SingleGame from './index';

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
    mock.expect(SINGLE_GAME).reply({
      Game: FINISHED_GAME
    });

    const tree = renderer.create(App()).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders loading state', () => {
    mock.expect(SINGLE_GAME).loading(true);

    const tree = renderer.create(App()).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders errors when API fails', () => {
    mock.expect(SINGLE_GAME).fail('everything is terrible');

    const tree = renderer.create(App()).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
