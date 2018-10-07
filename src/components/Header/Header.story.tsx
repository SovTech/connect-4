import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Header from './index';
import { mock } from '../../testing/graphql';
import { ApolloProvider } from 'react-apollo';
import { LATEST_ROOM_STATUS } from '../../graphql/queries';
import StoryRouter from 'storybook-react-router';

mock.expect(LATEST_ROOM_STATUS);

storiesOf('Header', module)
  .addDecorator(StoryRouter())
  .add('Room free', () => (
    <ApolloProvider client={mock.client as any}>
      <Header/>
    </ApolloProvider>
  ))
  .add('Room booked', () => (
    <ApolloProvider client={mock.client as any}>
      <Header/>
    </ApolloProvider>
  ));
