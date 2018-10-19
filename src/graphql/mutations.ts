import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

export const JOIN_GAME = gql`
  mutation joinGame {
    joinGame {
      id
    }
  }
`;

export const CANCEL_GAME = gql`
  mutation cancelGame($gameId: ID!) {
    updateGame(id: $gameId, status: CANCELLED) {
      id
    }
  }
`;

export class CancelGameMutation extends Mutation<{ updateGame: { id: string }; }, { gameId: string }> {
}

export const SLACK_LOGIN_MUTATION = gql`
  mutation slackLogin($token: String!) {
    slackLogin(slackToken: $token) {
      id
      token
      firstName
      lastName
      email
    }
  }
`;

export const SET_GAME_WINNER = gql`
  mutation setGameWinner($gameId: ID!, $winner: SideColor!) {
    updateGame(id: $gameId, winner: $winner, status: FINISHED) {
      id
      status
      winner
    }
  }
`;

export const INSERT_PIECE = gql`
  mutation insertPiece($gameId: ID!, $column: Int!) {
    insertPiece(gameId: $gameId, column: $column) {
      id
      grid
      status
      nextPlayer
      winner
    }
  }
`;
