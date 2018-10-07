import * as React from 'react';
import { storiesOf } from '@storybook/react';
import GameCard from './index';
import { CANCELLED_GAME, FINISHED_GAME, IN_PROGRESS_GAME, NOT_STARTED_GAME } from '../../constants/dummy_content';
import { mock } from '../../testing/graphql';
import { ApolloProvider } from 'react-apollo';
import StoryRouter from 'storybook-react-router';
import ContainerWrapper from '../ContainerWrapper';

storiesOf('Game Card', module)
  .addDecorator(StoryRouter())
  .add('Not started', () => (
    <ApolloProvider client={mock.client as any}>
      <ContainerWrapper>
        <GameCard
          {...NOT_STARTED_GAME}
        />
      </ContainerWrapper>
    </ApolloProvider>
  ))
  .add('In progress', () => (
    <ApolloProvider client={mock.client as any}>
      <ContainerWrapper>
        <GameCard
          {...IN_PROGRESS_GAME}
        />
      </ContainerWrapper>
    </ApolloProvider>
  ))
  .add('Finished', () => (
    <ApolloProvider client={mock.client as any}>
      <ContainerWrapper>
        <GameCard
          {...FINISHED_GAME}
        />
      </ContainerWrapper>
    </ApolloProvider>
  ))
  .add('Cancelled', () => (
    <ApolloProvider client={mock.client as any}>
      <ContainerWrapper>
        <GameCard
          {...CANCELLED_GAME}
        />
      </ContainerWrapper>
    </ApolloProvider>
  ));
