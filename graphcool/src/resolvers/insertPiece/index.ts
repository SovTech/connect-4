import { fromEvent, FunctionEvent } from 'graphcool-lib';
import { GraphQLClient } from 'graphql-request';
import { addPiece } from '../../utils/connect4/board';
import { didSomeoneWin } from '../../utils/connect4/matches';

interface EventData {
  gameId: string;
  column: number;
}

interface Player {
  email: string;
  id: string;
}

interface Game {
  Game: {
    id: string;
    yellowPlayer: Player;
    redPlayer: Player;
  }
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

      let selectedColor;

      if (game.Game.redPlayer && game.Game.redPlayer.id === playerId) {
        selectedColor = 'RED';
      } else if (game.Game.yellowPlayer && game.Game.yellowPlayer.id === playerId) {
        selectedColor = 'YELLOW';
      } else {
        return {error: 'Player is not in this game'};
      }

      const updatedGrid = addPiece(game.Game.grid, column, selectedColor);
      const status = didSomeoneWin(updatedGrid) ? 'FINISHED' : 'IN_PROGRESS';

      return await updateGame(api, gameId, updatedGrid, status).then(async game => {
        return {data: {id: gameId, grid: updatedGrid, status: game.updateGame.status}};
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

async function updateGame(api: GraphQLClient, gameId: string, grid: string, status: string): Promise<any> {
  const queryVariables = {
    gameId,
    grid,
    status
  };

  const updateGameQuery = `
    mutation updateGame($gameId: ID!, $grid: Json!, $status: GameStatus) {
      updateGame(
        id: $gameId
        grid: $grid
        status: $status
      ) {
        id
        grid
        status
      }
    }
  `;

  return api.request<{ updateGame: any }>(updateGameQuery, queryVariables);
}
