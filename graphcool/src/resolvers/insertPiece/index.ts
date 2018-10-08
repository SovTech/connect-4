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
    const gameId = event.context.auth.nodeId;

    return await getGame(api, gameId).then(async game => {
      console.log(game)
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
        grid
      }
    }
  `;

  return api.request<{ getGame: any }>(getGameQuery, queryVariables)
}
