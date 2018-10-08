import { FunctionEvent } from 'graphcool-lib';
import { SLACK_BOT_USERNAME, SLACK_TOKEN } from '../../constants';
import { getSlackChannelFromAlias } from '../../utils';

// Leave as require - if import it will get removed because unused but we really need it
require('isomorphic-fetch');

type EventData = {
  Game: {
    node: {
      createdBy: {
        slackUserId: string;
      }
    };
  };
}

export default (event: FunctionEvent<EventData>) => {
  const gameCreator = event.data.Game.node.createdBy.slackUserId;

  const text = `A new game has been created by <@${gameCreator}> :tada: %0A` +
    `Join it now @ connect4.sovtech.org`;
  const slackURL = `https://slack.com/api/chat.postMessage`
    + `?token=${SLACK_TOKEN}`
    + `&username=${SLACK_BOT_USERNAME}`
    + `&channel=${getSlackChannelFromAlias(event.context.graphcool.alias)}`
    + `&text=${text}`;

  return fetch(slackURL);
};
