import { fromEvent, FunctionEvent } from 'graphcool-lib';
import { GraphQLClient } from 'graphql-request';
import { SideColor } from '../../../custom-typings/SideColor';
import Connect4 from '../../utils/connect4';

interface EventData {
  gameId: string;
  column: number;
}

export default async (event: FunctionEvent<EventData>) => {
  console.log(event);

  try {
    const graphcool = fromEvent(event);
    const api = graphcool.api('simple/v1');

    // no logged in user
    if (!event.context.auth || !event.context.auth.nodeId) {
      return {error: 'Not logged in'};
    }

    // Get the user id
    const playerId = event.context.auth.nodeId;
    const {gameId, column} = event.data;

    return await getGame(api, gameId).then(async game => {

      const {grid, nextPlayer, redPlayer, yellowPlayer} = game.Game;

      let selectedColor;

      if (redPlayer && redPlayer.id === playerId) {
        selectedColor = 'RED';
      } else if (yellowPlayer && yellowPlayer.id === playerId) {
        selectedColor = 'YELLOW';
      } else {
        return {error: 'Player is not in this game'};
      }

      if (selectedColor !== nextPlayer) {
        return {error: 'Its not your turn'};
      }

      const updatedGrid = Connect4.addPiece(grid, column, nextPlayer);
      const status = Connect4.didSomeoneWin(updatedGrid) ? 'FINISHED' : 'IN_PROGRESS';
      const winner = Connect4.didSomeoneWin(updatedGrid) ? nextPlayer : null;

      return await updateGame(api, gameId, updatedGrid, status, getNextColor(nextPlayer), winner).then(async game => {
        return {
          data:
            {
              id: gameId,
              grid: updatedGrid,
              status: game.updateGame.status,
              nextPlayer: game.updateGame.nextPlayer,
              winner: game.updateGame.winner
            }
        };
      });
    });
  } catch (e) {
    return {error: e.message};
  }
};

/**
 * Gets the last game that was created and the status of that game
 * If open join if not create a new one
 * @param {GraphQLClient} api
 * @param gameId
 * @returns {Promise<any>}
 */
async function getGame(api: GraphQLClient, gameId: string): Promise<any> {
  const queryVariables = {
    gameId
  };

  const getGameQuery = `
    query getGame($gameId: ID!) {
      Game(
        id: $gameId
      ) {
        id
        inserts
        grid
        nextPlayer
        redPlayer {
          id
        }
        yellowPlayer {
          id
        }
      }
    }
  `;

  return api.request<{ getGame: any }>(getGameQuery, queryVariables);
}

async function updateGame(api: GraphQLClient, gameId: string, grid: Grid, status: string, nextPlayer: SideColor, winner: SideColor): Promise<any> {
  const queryVariables = {
    gameId,
    grid,
    status,
    nextPlayer,
    winner
  };

  const updateGameQuery = `
    mutation updateGame($gameId: ID!, $grid: Json!, $status: GameStatus, $nextPlayer: SideColor, $winner: SideColor) {
      updateGame(
        id: $gameId
        grid: $grid
        status: $status
        nextPlayer: $nextPlayer
        winner: $winner
      ) {
        id
        grid
        status
        winner
        nextPlayer
      }
    }
  `;

  return api.request<{ updateGame: any }>(updateGameQuery, queryVariables);
}

function getNextColor(currentColor: SideColor) {
  if (currentColor === 'RED') {
    return 'YELLOW';
  }
  return 'RED';
}
