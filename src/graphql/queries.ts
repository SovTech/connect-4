import gql from 'graphql-tag';
import Query from 'react-apollo/Query';
import { Game } from '../../custom-typings/Game';

export const ALL_GAMES = gql`
  query allGames {
    allGames(
      orderBy: createdAt_DESC
      first: 5
    ) {
      id
      createdAt
      status
      winner
      grid
      inserts
      nextPlayer
      yellowPlayer {
        id
        avatarUrl
        firstName
        lastName
        email
      }
      redPlayer {
        id
        avatarUrl
        firstName
        lastName
        email
      }
    }
  }
`;

export class AllGamesQuery extends Query<{ allGames: Game[]; }, {}> {
}

export const ALL_USERS = gql`
  query allUsers {
    allUsers {
      id
      email
      firstName
      createdAt
      avatarUrl
      _gamesCreatedMeta {
        count
      }
      _gamesCancelledMeta {
        count
      }
      _redPlayerGamesMeta {
        count
      }
      _yellowPlayerGamesMeta {
        count
      }
    }
  }
`;

export class AllUsersQuery extends Query<{ allUsers: User[]; }, {}> {
}

export const SINGLE_GAME = gql`
  query singleGame($gameId: ID!) {
    Game(id: $gameId)  {
      id
      createdAt
      status
      winner
      nextPlayer
      yellowPlayer {
        id
        avatarUrl
        firstName
        lastName
        email
      }
      redPlayer {
        id
        avatarUrl
        firstName
        lastName
        email
      }
    }
  }
`;

export class SingleGameQuery extends Query<{ Game: Game; }, { gameId: string }> {
}
