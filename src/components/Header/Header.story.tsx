import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import StoryRouter from 'storybook-react-router';
import { mock } from '../../testing/graphql';
import Header from './index';

storiesOf('Header', module)
  .addDecorator(StoryRouter())
  .add('Header', () => (
    <ApolloProvider client={mock.client as any}>
      <Header />
    </ApolloProvider>
  ));
