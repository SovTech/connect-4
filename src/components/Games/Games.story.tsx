import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { default as Games } from './index';
import { CANCELLED_GAME, FINISHED_GAME, IN_PROGRESS_GAME, NOT_STARTED_GAME } from '../../constants/dummy_content';
import { mock } from '../../testing/graphql';
import { ApolloProvider } from 'react-apollo';
import StoryRouter from 'storybook-react-router';
import ContainerWrapper from '../ContainerWrapper';

storiesOf('Games', module)
  .addDecorator(StoryRouter())
  .add('Games will all statuses', () => (
    <ApolloProvider client={mock.client as any}>
      <ContainerWrapper>
        <Games
          games={[NOT_STARTED_GAME, IN_PROGRESS_GAME, FINISHED_GAME, CANCELLED_GAME]}
          subscribeToNewGames={() => console.log('subscribeToNewGames')}
        />
      </ContainerWrapper>
    </ApolloProvider>
  ));
