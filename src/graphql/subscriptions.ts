import gql from 'graphql-tag';

export const GAMES_SUBSCRIPTION = gql`
  subscription updatedGame {
    Game(
      filter: {
        mutation_in: [CREATED, UPDATED]
      }
    ) {
      mutation
      node {
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
  }
`;

export const GAME_CREATED_SUBSCRIPTION = gql`
  subscription newGame {
    Game(
      filter: {
        mutation_in: [CREATED]
      }
    ) {
      mutation
      node {
        id
        grid
      }
    }
  }
`;

export const ROOM_STATUS_SUBSCRIPTION = gql`
  subscription roomStatus {
    RoomStatusEntry(
      filter: {
        mutation_in: [CREATED]
      }
    ) {
      mutation
      node {
        id
        status
      }
    }
  }
`;
