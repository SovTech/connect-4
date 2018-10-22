import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import * as renderer from 'react-test-renderer';
import { FINISHED_GAME, NOT_STARTED_GAME } from '../../../constants/dummy_content';
import { mock } from '../../../testing/graphql';
import GameCard from '../index';

describe('GameCard Component', () => {
  it('renders a finished game correctly', () => {
    const tree = renderer
      .create((
        <ApolloProvider client={mock.client as any}>
          <GameCard
            {...FINISHED_GAME}
          />
        </ApolloProvider>
      )).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a not started game correctly', () => {
    const tree = renderer
      .create((
        <ApolloProvider client={mock.client as any}>
          <GameCard
            {...NOT_STARTED_GAME}
          />
        </ApolloProvider>
      )).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
