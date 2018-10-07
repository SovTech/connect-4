import { fromEvent, FunctionEvent } from 'graphcool-lib';
import { GraphQLClient } from 'graphql-request';

interface EventData {
  status: string;
  playerId: string;
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

    // Get the status
    const {status} = event.data;

    return await addEntry(api, playerId, status).then(async r => r);
  } catch (e) {
    return {error: e.message};
  }
};

async function addEntry(api: GraphQLClient, creatorId: string, status: string): Promise<any> {
  const addStatusEntryMutation = `
    mutation addStatusEntry($creatorId: ID!, $status: RoomStatus!) {
      createRoomStatusEntry(
        createdById: $creatorId
        status: $status
      ) {
        id
        status
      }
    }
  `;

  const variables = {
    creatorId: creatorId,
    status: status
  };

  return api.request<{ statusEntry: any }>(addStatusEntryMutation, variables)
    .then((r: any) => {
      return {data: {id: r.createRoomStatusEntry.id, status: r.createRoomStatusEntry.status}};
    });
}
