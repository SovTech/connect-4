import { fromEvent, FunctionEvent } from 'graphcool-lib';
import { GraphQLClient } from 'graphql-request';

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

      const updatedGrid = addPiece(game.Game.grid, column, 'RED');

      return await updateGame(api, gameId, updatedGrid).then(async game => {
        return {data: game.Game};
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
      }
    }
  `;

  return api.request<{ getGame: any }>(getGameQuery, queryVariables);
}

async function updateGame(api: GraphQLClient, gameId: string, grid: any[]): Promise<any> {
  const queryVariables = {
    gameId,
    grid
  };

  const updateGameQuery = `
    mutation updateGame($gameId: ID!, $grid: Json!) {
      updateGame(
        id: $gameId
        grid: $grid
      ) {
        id
        grid
      }
    }
  `;

  return api.request<{ updateGame: any }>(updateGameQuery, queryVariables);
}


function addPiece(grid: any[], columnIndex: number, piece: string) {
  const column = grid[columnIndex];
  let cellIndex = -1;

  // Loops through column, looking for zeros (to determine next available cell)
  column.forEach((columnPiece: any, i: number) => {
    if (columnPiece === 0) {
      cellIndex = i;
    }
  });

  // Did we find an available cell?
  if (cellIndex >= 0) {

    // Adds piece to column cell
    column[cellIndex] = piece;

    // Makes board inactive if somebody won
    // if (this.didSomebodyWin()) {
    //   this.isActive = false;
    // }
  }
  return JSON.stringify(grid);
}
