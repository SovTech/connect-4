import gql from 'graphql-tag';
import Query from 'react-apollo/Query';

export const ALL_GAMES = gql`
  query {
    allGames(
      orderBy: createdAt_DESC
      first: 5
    ) {
      id
      createdAt
      status
      winner
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

export class AllGamesQuery extends Query<{ allGames: Array<Game>; }, {}> {
}

export const ALL_USERS = gql`
  query {
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

export class AllUsersQuery extends Query<{ allUsers: Array<User>; }, {}> {
}

export const LATEST_ROOM_STATUS = gql`
  query {
    allRoomStatusEntries(
      first: 1
      orderBy: createdAt_DESC
    )  {
      id
      status
    }
  }
`;

export const SINGLE_GAME = gql`
  query singleGame($gameId: ID!) {
    Game(id: $gameId)  {
      id
      createdAt
      status
      winner
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
