import { fromEvent, FunctionEvent } from 'graphcool-lib';
import { GraphQLClient } from 'graphql-request';

interface EventData {
  gameId: string;
  playerId: string;
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

    return await getLastGame(api).then(async lastGame => {
      if (typeof lastGame.allGames[0] !== 'undefined' && lastGame.allGames[0].status === 'NOT_STARTED') {
        // Join game
        return await joinGame(api, lastGame.allGames[0].id, playerId)
          .then(existingGame => existingGame)
          .catch((e) => {
            return {error: e.message};
          });
      } else {
        // Status must be CANCELLED, FINISHED or IN_PROGRESS so start a new one
        // Create New game with 2 teams and add creator as a player to 1 of those teams
        return await createGame(api, playerId)
          .then(newGame => newGame)
          .catch((e) => {
            return {error: e.message};
          });
      }
    });
  } catch (e) {
    return {error: e.message};
  }
};

async function joinGame(api: GraphQLClient, gameId: string, playerId: string): Promise<any> {

  const getGameQuery = `
    query getGame($gameId: ID!) {
      Game(
        id: $gameId
      ) {
        id
        yellowPlayer {
            id
        }
        redPlayer {
            id
        }
      }
    }
  `;

  const updateGameMutation2 = `
    mutation updateGame($gameId: ID!, $playerId: ID!) {
      updateGame(
        id: $gameId
        redPlayerId: $playerId
        placesRemaining: 0
        status: IN_PROGRESS
      ) {
        id
      }
    }
  `;

  const queryVariables = {
    gameId
  };

  const mutationVariables = {
    gameId,
    playerId
  };

  return api.request<{ joinGame: any }>(getGameQuery, queryVariables)
    .then((game: Game) => {

      // Don't allow a user to join a game twice
      if (game.Game.yellowPlayer) {
        if (game.Game.yellowPlayer.id === playerId) {
          return {error: {message: 'Already in game!'}};
        }
      }
      if (game.Game.redPlayer) {
        if (game.Game.redPlayer.id === playerId) {
          return {error: {message: 'Already in game!'}};
        }
      }

      if (!game.Game.redPlayer) {
        return api.request(updateGameMutation2, mutationVariables).then((response: any) => {
          return {data: {id: gameId}};
        });
      } else {
        return {error: {message: 'Game already full!'}};
      }
    });
}

async function createGame(api: GraphQLClient, creatorId: string): Promise<any> {
  const createGameMutation = `
    mutation createGame($creatorId: ID!) {
      createGame(
        createdById: $creatorId
        yellowPlayerId: $creatorId
      ) {
        id
        status
      }
    }
  `;

  const gameVariables = {
    creatorId: creatorId
  };

  /**
   * Create a game then create the 2 teams
   */
  return api.request<{ createGame: any }>(createGameMutation, gameVariables)
    .then((game: any) => {
      return {data: {id: game.createGame.id}};
    });
}

/**
 * Gets the last game that was created and the status of that game
 * If open join if not create a new one
 * @param {GraphQLClient} api
 * @returns {Promise<any>}
 */
async function getLastGame(api: GraphQLClient): Promise<any> {
  const getLastGameQuery = `
    query allGames {
      allGames(
        first: 1
        orderBy: createdAt_DESC
      ) {
        id
        status
      }
    }
  `;

  return api.request<{ getLastGame: any }>(getLastGameQuery)
    .then((game: any) => {
      return game;
    });
}
