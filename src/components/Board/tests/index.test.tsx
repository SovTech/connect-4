import * as React from 'react';
import { MockedProvider } from 'react-apollo/test-utils';
import * as renderer from 'react-test-renderer';
import { ALL_GAMES } from '../../../graphql/queries';
import Board from '../index';

const mocks = [
  {
    request: {
      query: ALL_GAMES,
      variables: {
        name: 'Buck'
      }
    },
    result: {
      data: {
        dog: {id: '1', name: 'Buck', breed: 'bulldog'}
      }
    }
  }
];

it('renders without error', () => {
  renderer.create(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Board
        gameId=''
        grid={[]}
        isActive={true}
      />
    </MockedProvider>
  );
});
