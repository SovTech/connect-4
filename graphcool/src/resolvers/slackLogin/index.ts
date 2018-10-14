import { fromEvent, FunctionEvent } from 'graphcool-lib';
import { GraphQLClient } from 'graphql-request';
import * as fetch from 'isomorphic-fetch';
import { COMPANY_DOMAIN, SLACK_CLIENT_ID, SLACK_CLIENT_SECRET } from '../../constants';
import { getSiteURLFromAlias } from '../../utils';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface SlackUser {
  user: {
    id: string;
    email: string;
    name: string;
    image_72: string;
    image_192: string;
  },
  team: {
    id: string;
  }
}

interface EventData {
  slackToken: string;
}

export default async (event: FunctionEvent<EventData>) => {
  console.log(event);

  try {
    const graphcool = fromEvent(event);
    const api = graphcool.api('simple/v1');

    const {slackToken} = event.data;

    // call slack API to obtain user data
    const slackUser = await getSlackUser(slackToken, event.context.graphcool.alias);

    if (typeof slackUser.user === 'undefined') {
      return {error: 'There was an error logging you in.'};
    }

    // Limit user login to a single email domain - this is probably not required
    if (slackUser.user.email.replace(/.*@/, '') !== COMPANY_DOMAIN) {
      return {error: 'Email address is not @' + COMPANY_DOMAIN};
    }

    // get graphcool user by slack id
    let user = await getGraphcoolSlackUser(api, slackUser.user.id)
      .then(r => r.User);

    // check if graphcool user exists, and create new one if not
    let userId: string | null = null;
    let email: string;
    let firstName: string = '';
    let lastName: string = '';

    if (!user) {
      // get graphcool user by slack id
      user = await getGraphcoolUser(api, slackUser.user.email)
        .then(r => r.User);
    }
    if (!user) {
      const tempNameArray = slackUser.user.name.split(' ');

      if (tempNameArray[0]) {
        firstName = tempNameArray[0];
      }
      if (tempNameArray[1]) {
        lastName = tempNameArray[1];
      }

      const newUser = await createGraphcoolUser(api, slackUser.user.id, slackUser.user.email, firstName, lastName, slackUser.user.image_192);
      userId = newUser.id;
      firstName = newUser.firstName;
      lastName = newUser.lastName;
      email = newUser.email;
    } else {
      userId = user.id;
      firstName = user.firstName;
      lastName = user.lastName;
      email = user.email;
    }

    // generate node token for User node
    const token = await graphcool.generateAuthToken(userId!, 'User');

    return {data: {id: userId, token, firstName, lastName, email}};
  } catch (e) {
    return {error: e.message};
  }
};

async function getSlackUser(slackToken: string, alias: string): Promise<SlackUser> {
  const endpoint = `https://slack.com/api/oauth.access`
    + `?client_id=${SLACK_CLIENT_ID}`
    + `&client_secret=${SLACK_CLIENT_SECRET}`
    + `&code=${slackToken}`
    + `&redirect_uri=${encodeURIComponent(getSiteURLFromAlias(alias) + '/oauth')}`;

  const data = await fetch(endpoint)
    .then(response => response.json());

  if (data.error_description) {
    throw new Error(data.error_description);
  }

  if (!data.user) {
    console.log('*** slack response: ', data);
  }

  return data;
}

async function getGraphcoolSlackUser(api: GraphQLClient, slackUserId: string): Promise<{ User: User }> {
  const query = `
    query getUser($slackUserId: String!) {
      User(slackUserId: $slackUserId) {
        id
        firstName
        lastName
        email
      }
    }
  `;

  const variables = {
    slackUserId
  };

  return api.request<User>(query, variables);
}

async function getGraphcoolUser(api: GraphQLClient, email: string): Promise<{ User: User }> {
  const query = `
    query getUser($email: String!) {
      User(email: $email) {
        id
        firstName
        lastName
        email
      }
    }
  `;

  const variables = {
    email
  };

  return api.request<User>(query, variables);
}

async function createGraphcoolUser(api: GraphQLClient, slackUserId: string, email: string, firstName: string,
                                   lastName: string, avatarUrl: string): Promise<User> {
  const mutation = `
    mutation createUser(
    $slackUserId: String!,
     $email: String!,
      $firstName: String!,
       $lastName: String!,
        $avatarUrl: String!
        ) {
      createUser(
        slackUserId: $slackUserId
        email: $email
        firstName: $firstName
        lastName: $lastName
        avatarUrl: $avatarUrl
      ) {
        id
        firstName
        lastName
        email
      }
    }
  `;

  const variables = {
    slackUserId,
    email,
    firstName,
    lastName,
    avatarUrl
  };

  return api.request<{ createUser: User }>(mutation, variables)
    .then((r: any) => {
      return r.createUser;
    });
}
