import { FunctionEvent } from 'graphcool-lib';
import { SLACK_BOT_USERNAME, SLACK_TOKEN } from '../../constants';
import { getSlackChannelFromAlias } from '../../utils';

// Leave as require - if import it will get removed because unused but we really need it
require('isomorphic-fetch');

type EventData = {
  Game: {
    node: {
      placesRemaining: number;
      status: string;
      createdBy: {
        slackUserId: string;
      }
      redPlayer: {
        slackUserId: string;
      }
      yellowPlayer: {
        slackUserId: string;
      }
    };
  };
}

export default (event: FunctionEvent<EventData>) => {
  const {placesRemaining, status} = event.data.Game.node;

  const yellowPlayerName = event.data.Game.node.yellowPlayer ? event.data.Game.node.yellowPlayer.slackUserId : '';
  const redPlayerName = event.data.Game.node.redPlayer ? event.data.Game.node.redPlayer.slackUserId : '';

  let text = '';
  if (status === 'FINISHED') {
    return {error: 'Don\'t send message'};
  } else if (status === 'CANCELLED') {
    text = `Game cancelled :cry:`;
  } else if (placesRemaining === 1) {
    text = `<@${yellowPlayerName}> %26 <@${redPlayerName}> are in! %0A` +
      `Only 1 more spot to go! Ahhhhh!!! :scream_cat:`;
  } else if (placesRemaining === 0) {
    text = `Awesome! All spots are filled! :thumbsup_all: %0A` +
      `Let's go already! :bender: %0A` +
      `<@${yellowPlayerName}> %26 VS <@${redPlayerName}> %26`;
  } else {
    return {error: 'Other change occurred'};
  }
  const slackURL = `https://slack.com/api/chat.postMessage`
    + `?token=${SLACK_TOKEN}`
    + `&username=${SLACK_BOT_USERNAME}`
    + `&channel=${getSlackChannelFromAlias(event.context.graphcool.alias)}`
    + `&text=${text}`;

  return fetch(slackURL);
};
